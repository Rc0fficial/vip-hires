const UrlIcon = ({color,height, width  }) => {
    return (
        <svg height={height} width={width} fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
            <path d="M10.8333 4.99967L12.4999 3.33301C13.3333 2.49967 14.9999 2.49967 15.8333 3.33301L16.6666 4.16634C17.4999 4.99967 17.4999 6.66634 16.6666 7.49967L12.4999 11.6663C11.6666 12.4997 9.99992 12.4997 9.16659 11.6663M9.16659 14.9997L7.49992 16.6663C6.66659 17.4997 4.99992 17.4997 4.16659 16.6663L3.33325 15.833C2.49992 14.9997 2.49992 13.333 3.33325 12.4997L7.49992 8.33301C8.33325 7.49967 9.99992 7.49967 10.8333 8.33301" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
    );
}

export default UrlIcon
