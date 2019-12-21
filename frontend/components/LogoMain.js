import React from 'react';




const LogoMain = props => (
  <svg width={75} height={100} {...props} viewBox="0 0 250 200" >
    <defs>
      <filter
        x="-14.4%"
        y="-5.6%"
        width="128.9%"
        height="115.7%"
        filterUnits="objectBoundingBox"
        id="prefix__a"
      >
        <feOffset dy={5} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation={5}
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g
      filter="url(#prefix__a)"
      transform="translate(13)"
      fill="none"
      fillRule="evenodd"
    >
      <path
        d="M1.25 9v201.344M147.25 9v201.344"
        stroke="#24F1FF"
        strokeWidth={8}
        strokeLinecap="square"
      />
      <path
        stroke="#24F1FF"
        strokeWidth={8}
        d="M46.5 120L64 92H29zM102.5 120L120 92H85z"
      />
      <path
        d="M74.667 106.654V174"
        stroke="#24F1FF"
        strokeWidth={8}
        strokeLinecap="square"
      />
      <circle stroke="#24F1FF" strokeWidth={8} cx={74.5} cy={66.5} r={10.5} />
      <path
        d="M1.658 90h144.684"
        stroke="#24F1FF"
        strokeWidth={8}
        strokeLinecap="square"
      />
      <text
        fontFamily="MinistryofMoron, Ministry of Moron"
        fontSize={44}
        fill="#24F1FF"
      >
        <tspan x={17.133} y={214}>
          {'Cal'}
        </tspan>
      </text>
      <text
        fontFamily="MinistryofMoron, Ministry of Moron"
        fontSize={40}
        fill="#24F1FF"
      >
        <tspan x={18.719} y={34}>
          {'Gym'}
        </tspan>
      </text>
    </g>
  </svg>
)

export default LogoMain;
