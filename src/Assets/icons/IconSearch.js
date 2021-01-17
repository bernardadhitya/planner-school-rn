import * as React from "react"
import Svg, { Defs, Path, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const IconSearch = (props) => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <Path
          d="M5 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6m15.707 8.293l-3.395-3.396A7.952 7.952 0 0019 11c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8a7.952 7.952 0 004.897-1.688l3.396 3.395a.997.997 0 001.414 0 .999.999 0 000-1.414"
          id="prefix__a"
        />
      </Defs>
      <Use
        fill="#222B45"
        xlinkHref="#prefix__a"
        transform="translate(-3 -3)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default IconSearch;
