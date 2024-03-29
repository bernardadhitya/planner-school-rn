import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconEmotion1 = (props) => {
  const { focused, size } = props;
  return (
    <Svg
      width={size || 23}
      height={size || 23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.5 0C5.147 0 0 5.147 0 11.5S5.147 23 11.5 23 23 17.853 23 11.5 17.853 0 11.5 0zm3.71 7.79c.82 0 1.483.663 1.483 1.484s-.663 1.484-1.483 1.484c-.821 0-1.484-.663-1.484-1.484 0-.82.663-1.484 1.484-1.484zm-7.42 0c.821 0 1.484.663 1.484 1.484s-.663 1.484-1.484 1.484c-.82 0-1.484-.663-1.484-1.484 0-.82.664-1.484 1.484-1.484zm7.893 10.118a5.44 5.44 0 00-4.183-1.956 5.44 5.44 0 00-4.183 1.957c-.626.755-1.766-.195-1.14-.951a6.926 6.926 0 015.323-2.49 6.9 6.9 0 015.319 2.494c.63.752-.51 1.702-1.136.947z"
        fill={focused ? "#E3466D" : "#C7C7C7"}
      />
    </Svg>
  )
}

export default IconEmotion1;