import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconBook = (props) => {
  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.531 0C6.77.05 5.257.227 4.323.87a.249.249 0 00-.1.205v5.686c0 .18.175.294.322.21.961-.544 2.351-.692 3.038-.733.235-.014.417-.225.417-.479V.481c0-.277-.213-.496-.469-.48zM3.677.87C2.743.225 1.23.05.469 0 .213-.014 0 .205 0 .48v5.28c0 .253.182.465.417.478.687.041 2.078.19 3.038.734.148.084.323-.03.323-.21v-5.69A.243.243 0 003.677.87z"
        fill="#222B45"
      />
    </Svg>
  )
}

export default IconBook
