import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ color: 'red', fontSize: '30px' }}>{text}</div>;

export const GoogleMap = ({ lat, lng }) => {
	const zoom = 12;

	return (
		<div style={{ height: '50%', width: '50%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyCMnIXapKgAwxk-D4AYU12CXFXUWfE88ok' }}
				defaultCenter={{ lat, lng }}
				defaultZoom={zoom}
			>
				<Marker text={'Marker'} lat={lat} lng={lng} />
			</GoogleMapReact>
		</div>
	);
};
