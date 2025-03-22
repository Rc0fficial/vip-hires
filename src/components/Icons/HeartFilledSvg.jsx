const HeartFilledIcon = ({ height , width,color,className }) => {
	return (
		<svg className={className} height={height} width={width} fill="none" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
			<g>
				<path d="M16.8332 28.1213L14.9965 26.4493C8.47317 20.5339 4.1665 16.6199 4.1665 11.8446C4.1665 7.9306 7.23184 4.87793 11.1332 4.87793C13.3372 4.87793 15.4525 5.90393 16.8332 7.5126C18.2138 5.90393 20.3292 4.87793 22.5332 4.87793C26.4345 4.87793 29.4998 7.9306 29.4998 11.8446C29.4998 16.6199 25.1932 20.5339 18.6698 26.4493L16.8332 28.1213Z" fill={color} />
			</g>
			<defs />
		</svg>
	);
}

export default HeartFilledIcon
