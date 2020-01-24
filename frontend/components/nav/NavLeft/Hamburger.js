import React, { Component } from 'react';
import styled from 'styled-components';


const BunStyle = styled.div`
  margin-left: 10px; 
  margin-top: 10px;
  position: fixed;
  z-index: 10;
  .toggle-button {
    text-decoration: none;
    border: none;
    background: none;
    background-color: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 36px;
    width: 48px;
    box-sizing: border-box;
    padding: 0;
  :focus {
    outline: none;
  }
  }
  .line {
    width: 42px;
    height: 4px;
    border-radius: 25px;
    background-color: white;
  }

`


const Hamburger = props => {
    return (
      <BunStyle onClick={props.toggle}>
         <button className="toggle-button" >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </BunStyle>
      )
};

export default Hamburger;
