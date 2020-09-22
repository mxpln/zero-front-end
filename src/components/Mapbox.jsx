import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
	'pk.eyJ1IjoicGF1bGluZS1kY3MiLCJhIjoiY2s5b2FxcGdsMGEwajNlbXN0NzJiYjR0OCJ9.SyBs2loDNXW2L0pOeQFAIQ';

const Mapbox = () => {
	const mapContainerRef = useRef(null);
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

		// clean up on unmount
		return () => map.remove();
	}, []);

	return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapbox;
