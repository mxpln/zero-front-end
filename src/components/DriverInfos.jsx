import React from 'react';

const DriverInfos = ({ info }) => {
	const driverProperties = info.properties;

	return (
		<div id="driver-info">
			{/* <img width={240} src={info.image} /> */}
			<h4>{driverProperties.name}</h4>
			<p>id: #{driverProperties.id}</p>
			<ul>
				Deliveries:<li>Done: {driverProperties.done} </li>
				<li>Left: {driverProperties.left} </li>
			</ul>
			<p>Next destination:{driverProperties.destination} </p>
		</div>
	);
};

export default DriverInfos;
