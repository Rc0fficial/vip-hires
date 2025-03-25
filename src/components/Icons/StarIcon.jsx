const StarIcon = ({ height, width ,color }) => {
    return (
        <svg height={height} width={width} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path d="M24 12.024C17.563 12.412 12.41 17.563 12.023 24H11.976C11.588 17.563 6.436 12.412 0 12.024V11.977C6.437 11.588 11.588 6.437 11.976 0H12.023C12.411 6.437 17.563 11.588 24 11.977V12.024Z" fill={color} />
        </svg>
    );
}

export default StarIcon
