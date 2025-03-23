const CloseIcon = ({ onClick ,height,width,color}) => {
	return (
		<svg onClick={onClick} height={height} width={width} fill="none" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" >
			<g clipPath="url(#clip0_2205_4501)">
				<path d="M8.84144 8.04586C8.62268 7.82709 8.2647 7.82709 8.04594 8.04586C7.82718 8.26462 7.82718 8.62259 8.04594 8.84135L16.7964 17.5918L8.04594 26.3422C7.82718 26.561 7.82718 26.919 8.04594 27.1377C8.2647 27.3565 8.62268 27.3565 8.84144 27.1377L17.5919 18.3873L26.3423 27.1377C26.5611 27.3565 26.9191 27.3565 27.1378 27.1377C27.3566 26.919 27.3566 26.561 27.1378 26.3422L18.3874 17.5918L27.1378 8.84135C27.3566 8.62259 27.3566 8.26462 27.1378 8.04586C26.9191 7.82709 26.5611 7.8271 26.3423 8.04586L17.5919 16.7963L8.84144 8.04586Z" fill={color} />
			</g>
			<defs>
				<clipPath id="clip0_2205_4501">
					<rect height={height} width={width} fill={color} />
				</clipPath>
			</defs>
		</svg>
	);
}

export default CloseIcon
