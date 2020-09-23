import React from 'react';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';

const DriverInfos = ({ info }) => {
	const driverProperties = info.properties;

	return (
		<div id="driver-info">
			<div id="driver-intro">
				<img
					width={240}
					src={driverProperties.picture}
					className="driver-picture"
				/>
				<div>
					<h3>{driverProperties.name}</h3>
					<span>id:</span> #{driverProperties.id}
				</div>
			</div>

			<div id="driver-delivery">
				<ul>
					<span>
						<ShutterSpeedIcon className="icon-popup" fontSize="small" />{' '}
						Deliveries:
					</span>
					<li>
						<span>Done:</span> {driverProperties.done}
					</li>
					<li>
						<span>Left:</span> {driverProperties.left}
					</li>
				</ul>
				<p>
					<span>
						<DirectionsBikeIcon className="icon-popup" fontSize="small" /> Next
						destination:
					</span>
					<br />
					{driverProperties.destination}
				</p>
			</div>
		</div>
	);
};

export default DriverInfos;
