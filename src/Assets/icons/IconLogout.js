import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconLogout = (props) => {
  return (
    <Svg
      width={22}
      height={24}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.45 21H18.7V5.318C18.7 4.04 17.96 3 17.05 3H13.2v3h3.3v18h4.95c.304 0 .55-.336.55-.75v-1.5c0-.414-.246-.75-.55-.75zM10.733.047l-6.6 2.332c-.49.173-.833.794-.833 1.508V21H.55c-.304 0-.55.336-.55.75v1.5c0 .414.246.75.55.75H12.1V1.555c0-1.011-.672-1.753-1.367-1.508zM9.075 13.5c-.455 0-.825-.672-.825-1.5s.37-1.5.825-1.5c.455 0 .825.672.825 1.5s-.37 1.5-.825 1.5z"
        fill="#222B45"
      />
    </Svg>
  )
}

export default IconLogout;
