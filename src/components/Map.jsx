import * as React from 'react';
import '../App.css';
import { useState } from 'react';

import MapGL, {
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
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
	bottom: 15,
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
		zoom: 10,
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
					longitude={popupInfo.geometry.coordinates[0]}
					latitude={popupInfo.geometry.coordinates[1]}
					closeOnClick={false}
					onClose={() => setPopupInfo()}
				>
					<DriverInfos info={popupInfo} />
				</Popup>
			)
		);
	};

	const onClickMarker = (driver) => {
		setPopupInfo(driver);
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
			<Pin data={geojson.features} onClick={onClickMarker} />
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
