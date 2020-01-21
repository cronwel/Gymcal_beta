import React from "react";

function CartIcon(props) {

  return (
    <svg width={36} height={25} viewBox="0 0 74 52" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M7.178 8a2 2 0 00-1.866 2.72l8.48 22A2 2 0 0015.656 34h35.685a2 2 0 001.866-1.28l8.484-22A2 2 0 0059.826 8H7.178z"
          stroke="#24F1FF"
          strokeWidth={4}
        />
        <circle stroke="#24F1FF" strokeWidth={4} cx={18.5} cy={44.5} r={5.5} />
        <circle stroke="#24F1FF" strokeWidth={4} cx={49.5} cy={44.5} r={5.5} />
        <path
          stroke="#24F1FF"
          strokeWidth={4}
          fill="#D8D8D8"
          d="M57 2h15v1H57z"
        />
      </g>
    </svg>
  )
}

export default CartIcon;
