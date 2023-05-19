
export default function ChevronIcon({
    size = 18, // or any default size of your choice
    color = "black" // or any color of your choice
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size} // added size here
            height={size} // added size here
            fill={color} // added color here
        >
<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>            </svg>)
}