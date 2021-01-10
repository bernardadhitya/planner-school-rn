import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconEmotion3 = (props) => {
  const { focused } = props;
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.5 0C5.147 0 0 5.147 0 11.5S5.147 23 11.5 23 23 17.853 23 11.5 17.853 0 11.5 0zm3.71 7.048c.82 0 1.483.663 1.483 1.484s-.663 1.484-1.483 1.484c-.821 0-1.484-.663-1.484-1.484 0-.82.663-1.484 1.484-1.484zm-7.42 0c.821 0 1.484.663 1.484 1.484s-.663 1.484-1.484 1.484c-.82 0-1.484-.663-1.484-1.484 0-.82.664-1.484 1.484-1.484zm4.081 12.613h-.742a6.683 6.683 0 01-6.626-5.843.745.745 0 01.737-.834h12.52c.445 0 .793.39.737.835a6.683 6.683 0 01-6.626 5.842z"
        fill="#FFCA4D"
      />
    </Svg>
  )
}

export default IconEmotion3;