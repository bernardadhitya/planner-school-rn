import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconEmotion3 = (props) => {
  const { focused } = props;
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.5 0C5.147 0 0 5.147 0 11.5S5.147 23 11.5 23 23 17.853 23 11.5 17.853 0 11.5 0zm0 19.661c-2.81 0-6.237-1.776-6.668-4.326a.743.743 0 01.96-.83c1.4.45 3.482.705 5.708.705s4.308-.255 5.708-.705a.744.744 0 01.96.83c-.431 2.55-3.858 4.326-6.668 4.326zm3.403-12.613c.82 0 1.484.663 1.484 1.484s-.663 1.484-1.484 1.484c-.82 0-1.484-.663-1.484-1.484 0-.82.663-1.484 1.484-1.484zm-7.42 0c.822 0 1.485.663 1.485 1.484s-.663 1.484-1.484 1.484C6.664 10.016 6 9.353 6 8.532c0-.82.663-1.484 1.484-1.484z"
        fill={focused ? "#FFCA4D" : "#C7C7C7"}
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default IconEmotion3;