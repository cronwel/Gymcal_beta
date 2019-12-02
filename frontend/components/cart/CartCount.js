import React from 'react';
import { TransitioningGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    psotion: relative;
    transition: all .4s;
    backface-visibility: hidden;
  }
  .counter-enter{
    transform: scale(4) rotatex(.5turn);
  }
  .counter-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotaeX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(.5turn);
  }
`;

const Dot = styled.div`
  background: ${ props => props.theme.red };
  color: white;
  border-radius: 50%;
  pading: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numberic: tabular-nums;
`;

const CartCount = ( { count } ) => (
  <AnimationStyles>
    <TransitioningGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={ count }
        timeout={ { enter: 400, exit: 400 } }
      >
        <Dot>{ count }</Dot>
      </CSSTransition>
    </TransitioningGroup>
  </AnimationStyles>
);

export default CartCount;


