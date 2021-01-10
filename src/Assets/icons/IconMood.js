import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconMood = (props) => {
  const { focused } = props;
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.625 3.375a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zm11.936.064a1.5 1.5 0 00-2.122 0L11.38 7.5H6.62l-4.06-4.06A1.5 1.5 0 10.439 5.56l4.436 4.436V22.5a1.5 1.5 0 001.5 1.5h.75a1.5 1.5 0 001.5-1.5v-5.25h.75v5.25a1.5 1.5 0 001.5 1.5h.75a1.5 1.5 0 001.5-1.5V9.996l4.436-4.435a1.5 1.5 0 000-2.122z"
        fill={ focused ? "#FFFFFF" : "#C4C4C4"}
      />
    </Svg>
  )
}

export default IconMood