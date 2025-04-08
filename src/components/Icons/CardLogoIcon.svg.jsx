const CardLogoIcon = ({ className,height,width,color1 ,color2 }) => {
    return (
        <svg height={height} width={width} fill="none" viewBox="0 0 44 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" fill={color1} fillOpacity="0.5" r="15" />
            <circle cx="29" cy="15" fill={color2} fillOpacity="0.5" r="15" />
        </svg>
    );
}

export default CardLogoIcon
