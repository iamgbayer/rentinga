import React from 'react'

export default function Search({ width, height, color }) {
  return (
    <svg width={width} height={height} viewBox="0 0 26 26" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.4853 24.3448C23.7042 25.1259 22.7545 25.4425 22.364 25.0519L16.7071 19.3951C16.3166 19.0046 16.6332 18.0548 17.4142 17.2738C18.1953 16.4927 19.145 16.1761 19.5355 16.5667L25.1924 22.2235C25.5829 22.614 25.2663 23.5638 24.4853 24.3448Z"
        fill={color}
      />
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="4" />
    </svg>
  )
}
