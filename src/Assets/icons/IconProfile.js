import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconProfile = (props) => {
  const { focused } = props;
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.5 0C5.595 0 0 5.595 0 12.5S5.595 25 12.5 25 25 19.405 25 12.5 19.405 0 12.5 0zm0 4.839a4.436 4.436 0 110 8.87 4.436 4.436 0 010-8.87zm0 17.338a9.659 9.659 0 01-7.384-3.437c.948-1.784 2.802-3.014 4.965-3.014.12 0 .242.02.357.055.656.212 1.341.348 2.062.348a6.65 6.65 0 002.062-.348c.115-.035.236-.055.357-.055 2.163 0 4.017 1.23 4.965 3.014a9.659 9.659 0 01-7.384 3.437z"
        fill={focused ? "#FFFFFF" : "#C4C4C4"}
      />
    </Svg>
  )
}

export default IconProfile