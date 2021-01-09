import * as React from "react"
import Svg, { Defs, Path, Use } from "react-native-svg"

const IconHome = (props) => {
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
          d="M11.285 2.3c.377-.384 1.053-.384 1.43 0l7.709 7.885c.366.376.576.9.576 1.439V20c0 1.103-.847 2-1.888 2H16v-9a1 1 0 00-1-1H9a1 1 0 00-1 1v9H4.889c-1.041 0-1.89-.897-1.89-2v-8.376c0-.54.21-1.063.576-1.438zM14 14v7h-4v-7h4z"
          id="prefix__a"
        />
      </Defs>
      <Use
        fill={focused ? "#FFFFFF" : "#979797"}
        xlinkHref="#prefix__a"
        transform="translate(-3 -2)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default IconHome;
