import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from './Markers';
import PopUp from './PopUp';
import fetchData from '../api/fetchData';

mapboxgl.accessToken =
	'pk.eyJ1IjoicGF1bGluZS1kY3MiLCJhIjoiY2s5b2FxcGdsMGEwajNlbXN0NzJiYjR0OCJ9.SyBs2loDNXW2L0pOeQFAIQ';

const Mapbox = () => {
	const mapContainerRef = useRef(null);
	const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
	// initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			// See style options here: https://docs.mapbox.com/api/maps/#styles
			style: 'mapbox://styles/mapbox/streets-v11',

			center: [-74.0315, 40.6989],
			maxZoom: 16,
			minZoom: 9,
			zoom: 9.68,
		});

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

		map.on('load', () => {
			// add the data source for new a feature collection with no features
			map.addSource('random-points-data', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [],
				},
			});
			// now add the layer, and reference the data source above by name
			map.addLayer({
				id: 'random-points-layer',
				source: 'random-points-data',
				type: 'symbol',
				layout: {
					// full list of icons here: https://labs.mapbox.com/maki-icons
					'icon-image': 'bakery-15', // this will put little croissants on our map
					'icon-padding': 0,
					'icon-allow-overlap': true,
				},
			});
		});

		map.on('moveend', async () => {
			// get new center coordinates
			const { lng, lat } = map.getCenter();
			// fetch new data
			const results = await fetchData({ longitude: lng, latitude: lat });
			// update "random-points-data" source with new data
			// all layers that consume the "random-points-data" data source will be updated automatically
			map.getSource('random-points-data').setData(results);
		});

		// change cursor to pointer when user hovers over a clickable feature
		map.on('mouseenter', 'random-points-layer', (e) => {
			if (e.features.length) {
				map.getCanvas().style.cursor = 'pointer';
			}
		});

		// reset cursor to default when user is no longer hovering over a clickable feature
		map.on('mouseleave', 'random-points-layer', () => {
			map.getCanvas().style.cursor = '';
		});

		// add popup when user clicks a point
		map.on('click', 'random-points-layer', (e) => {
			if (e.features.length) {
				const feature = e.features[0];
				// create popup node
				const popupNode = document.createElement('div');
				ReactDOM.render(<PopUp feature={feature} />, popupNode);
				// set popup on map
				popUpRef.current
					.setLngLat(feature.geometry.coordinates)
					.setDOMContent(popupNode)
					.addTo(map);
			}
		});

		// clean up on unmount
		return () => map.remove();
	}, []);

	return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapbox;
