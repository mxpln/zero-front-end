import React from 'react';

const DriverInfos = ({ info }) => {
	console.log(info);

	return (
		<>
			<div>
				<a
					target="_new"
					href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${info}`}
				>
					Wikipedia
				</a>
			</div>
			<img width={240} src={info.image} />
		</>
	);
};

export default DriverInfos;
