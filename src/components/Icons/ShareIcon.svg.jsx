const ShareIcon = ({ height , width,color,className }) => {
    return (
        <svg className={className} height={height} width={width} fill="none" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" >
            <path d="M16.5 1.49984L5.5 11.4998V16.4998L8.5 13.4998M0.5 7.99984L16.5 1.46484L13.7 15.9998L0.5 7.99984Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default ShareIcon
