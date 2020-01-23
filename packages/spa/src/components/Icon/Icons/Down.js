import React from 'react'

export default function Down({ width, height, color }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 12" fill="none">
      <path d="M1 1L10 11L19 1" stroke={color} />
    </svg>
  )
}
