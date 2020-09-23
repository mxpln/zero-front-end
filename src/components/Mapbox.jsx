import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from './Pin';
import PopUp from './DriverInfos';
import fetchData from '../api/fetchData';
import geojson from '../data.json';

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

		geojson.features.forEach(function (marker) {
			// create a HTML element for each feature
			var el = document.createElement('div');
			el.className = 'marker';

			// make a marker for each feature and add to the map
			new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }).setHTML(
						'<h3>' +
							marker.properties.title +
							'</h3><p>' +
							marker.properties.description +
							'</p>'
					)
				)
				.addTo(map);
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
