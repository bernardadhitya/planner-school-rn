import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconBookmark = (props) => {
  return (
    <Svg
      width={9}
      height={13}
      viewBox="0 0 9 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 13V1.219C0 .546.504 0 1.125 0h6.75C8.496 0 9 .546 9 1.219V13l-4.5-2.844L0 13z"
        fill="#222B45"
      />
    </Svg>
  )
}

export default IconBookmark
