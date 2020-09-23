import * as React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import MapGL, {
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
	GeolocateControl,
} from 'react-map-gl';
import Pin from './Pin';
import DriverInfos from './DriverInfos';
import geojson from '../data.json';

const MAPBOX_TOKEN =
	'pk.eyJ1IjoicGF1bGluZS1kY3MiLCJhIjoiY2s5b2FxcGdsMGEwajNlbXN0NzJiYjR0OCJ9.SyBs2loDNXW2L0pOeQFAIQ';

const fullscreenControlStyle = {
	position: 'absolute',
	bottom: 36,
	right: 0,
	padding: '10px',
};

const navStyle = {
	position: 'absolute',
	bottom: 72,
	right: 0,
	padding: '10px',
};

const scaleControlStyle = {
	position: 'absolute',
	bottom: 10,
	right: 0,
	padding: '10px',
};

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 40.6989,
		longitude: -74.0315,
		maxZoom: 16,
		minZoom: 9,
		zoom: 11,
		bearing: 0,
		pitch: 0,
	});

	const [popupInfo, setPopupInfo] = useState();

	const renderPopup = () => {
		return (
			popupInfo && (
				<Popup
					tipSize={5}
					anchor="top"
					longitude={-74.00878}
					latitude={40.70563}
					closeOnClick={false}
					onClose={() => setPopupInfo()}
				>
					<DriverInfos info={popupInfo} />
				</Popup>
			)
		);
	};

	const onClickMarker = (driver) => {
		setPopupInfo({ driver });
		console.log(driver);
	};

	return (
		<MapGL
			{...viewport}
			width="100vw"
			height="100vh"
			mapStyle="mapbox://styles/mapbox/streets-v11"
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			mapboxApiAccessToken={MAPBOX_TOKEN}
		>
			<Pin data={geojson} onClick={onClickMarker} />
			{renderPopup()}

			<div style={fullscreenControlStyle}>
				<FullscreenControl />
			</div>
			<div style={navStyle}>
				<NavigationControl />
			</div>
			<div style={scaleControlStyle}>
				<ScaleControl />
			</div>
		</MapGL>
	);
};

export default Map;
