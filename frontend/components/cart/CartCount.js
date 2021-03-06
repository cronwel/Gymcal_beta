import React from 'react';
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: inline-block;
    position: inherit;
    transition: all .4s;
    backface-visibility: hidden;
  }
  .counter-enter{
    transform: scale(4) rotateX(0.5turn);
  }
  .counter-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(2) rotateX(.5turn);
  }
`;

const Dot = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({count}) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{ count }</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);
CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CartCount;


