import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconClock = (props) => {
  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.5 0a3.5 3.5 0 10-.001 6.999A3.5 3.5 0 003.5 0zm.806 4.94L3.06 4.037a.17.17 0 01-.07-.137V1.524a.17.17 0 01.17-.17h.678a.17.17 0 01.17.17v1.944l.895.652a.17.17 0 01.037.237l-.398.547a.17.17 0 01-.237.037z"
        fill="#222B45"
      />
    </Svg>
  )
}

export default IconClock