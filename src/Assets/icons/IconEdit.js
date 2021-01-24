import * as React from "react"
import Svg, { Defs, Path, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const IconEdit = (props) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <Path
          d="M16.019 10.679l-2.695-2.695 1.948-1.95 2.694 2.695-1.947 1.95zm-6.94 6.946l-2.976.27.264-2.955 5.617-5.617 2.696 2.696-5.6 5.606zM19.405 7.338l-.001-.001-2.738-2.738c-.741-.74-2.014-.774-2.716-.07l-8.996 8.997a1.973 1.973 0 00-.57 1.214l-.38 4.17a1.002 1.002 0 001.088 1.086l4.17-.38a1.974 1.974 0 001.214-.567l8.997-8.997c.728-.73.697-1.948-.068-2.714z"
          id="prefix__a"
        />
      </Defs>
      <Use
        fill="#222B45"
        xlinkHref="#prefix__a"
        transform="translate(-4 -4)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default IconEdit