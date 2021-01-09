import * as React from "react"
import Svg, { Defs, Path, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const IconAssignments = (props) => {
  const { color, focused } = props;

  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <Path
          d="M19 11H5V7c0-.551.449-1 1-1h1v1c0 .55.45 1 1 1s1-.45 1-1V6h6v1c0 .55.45 1 1 1s1-.45 1-1V6h1c.551 0 1 .449 1 1v4zm-3 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1zm-8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM18 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H9V3c0-.55-.45-1-1-1s-1 .45-1 1v1H6C4.346 4 3 5.346 3 7v12c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V7c0-1.654-1.346-3-3-3z"
          id="prefix__a"
        />
      </Defs>
      <Use
        fill={ focused ? "#FFFFFF" : "#979797"}
        xlinkHref="#prefix__a"
        transform="translate(-3 -2)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default IconAssignments;
