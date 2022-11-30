export default function Loader(props) {
    var innerStyle = {
        width: "calc(80vw - 8px)",
        height: "calc(80vh + 2px)",
        position: "absolute",
        background: "#ccc",
        opacity: 0.8,
        zIndex: 999,
    }

    var spinnerStyle = {
        top: "50%",
        left: "50%",
        display: "inline-block",
        transform: "translate(-50%, -50%)",
        position: "relative",
    }

    return (
        props.visibility ? <div style={innerStyle}>
            <div style={spinnerStyle}>
                <svg fill="#000" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stopColor="#000" stopOpacity="0" offset="0%"/>
                            <stop stopColor="#000" stopOpacity=".631" offset="63.146%"/>
                            <stop stopColor="#000" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)">
                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </path>
                            <circle fill="#000" cx="36" cy="18" r="1">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </circle>
                        </g>
                    </g>
                </svg>
            </div>
        </div> : null
    )
}