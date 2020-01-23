import React from 'react'

export default function Dollar({ width, height, color }) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 24" fill="none">
      <path
        d="M10.5747 16.8117C10.5747 15.7719 10.249 14.9512 9.5977 14.3496C8.94636 13.7395 7.75479 13.1637 6.02299 12.6223C4.29119 12.0723 3.02682 11.475 2.22989 10.8305C1.09579 9.91953 0.528736 8.725 0.528736 7.24687C0.528736 5.81172 1.05364 4.64727 2.10345 3.75352C3.16092 2.85117 4.50958 2.4 6.14943 2.4C7.26054 2.4 8.25287 2.64062 9.12644 3.12188C10.0077 3.60313 10.6897 4.27344 11.1724 5.13281C11.6552 5.99219 11.8966 6.95039 11.8966 8.00742H10.4713C10.4713 6.72695 10.0805 5.7 9.29885 4.92656C8.51724 4.14453 7.46743 3.75352 6.14943 3.75352C4.86973 3.75352 3.85058 4.07578 3.09195 4.72031C2.33333 5.35625 1.95402 6.18984 1.95402 7.22109C1.95402 8.175 2.29502 8.95273 2.97701 9.5543C3.659 10.1559 4.75096 10.6887 6.25287 11.1527C7.75479 11.6082 8.89272 12.0852 9.66667 12.5836C10.4406 13.0734 11.023 13.6621 11.4138 14.3496C11.8046 15.0371 12 15.8492 12 16.7859C12 18.2641 11.4713 19.45 10.4138 20.3438C9.36398 21.2375 7.97701 21.6844 6.25287 21.6844C5.0728 21.6844 3.98851 21.448 3 20.9754C2.01916 20.5027 1.27203 19.841 0.758621 18.9902C0.252874 18.1395 0 17.1641 0 16.0641H1.41379C1.41379 17.3875 1.85441 18.4316 2.73563 19.1965C3.61686 19.9613 4.78927 20.3438 6.25287 20.3438C7.55555 20.3438 8.60153 20.0215 9.39081 19.377C10.1801 18.7324 10.5747 17.8773 10.5747 16.8117Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.88494 24V0H6.97585V24H5.88494Z"
        fill={color}
      />
    </svg>
  )
}