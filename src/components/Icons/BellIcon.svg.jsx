import React from 'react'

export default function BellIcon({height,width,stroke}) {
  return (
<svg height={height} width={width} fill="none" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M10.5216 14.8734C15.255 14.8734 17.4448 14.2705 17.6563 11.8507C17.6563 9.43266 16.1296 9.58815 16.1296 6.62125C16.1296 4.30378 13.9171 1.66699 10.5216 1.66699C7.12617 1.66699 4.91365 4.30378 4.91365 6.62125C4.91365 9.58815 3.38696 9.43266 3.38696 11.8507C3.59928 14.2796 5.78906 14.8734 10.5216 14.8734Z" fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	<path d="M12.5268 17.3809C11.3817 18.6431 9.59555 18.6581 8.43958 17.3809" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
</svg>
  )
}
