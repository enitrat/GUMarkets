import React from 'react';
import styled from "styled-components"

export const ImageWrapper = styled.div`
transition: all .2s ease-in-out;
border-radius: 10px;
&:hover{
    transform:scale(1.1);
}
`

export const BuyButton = styled.button`
  background-color: green;
  width: 90px;
  height: 30px;
  border: none;
  border-radius: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`;

export const SellButton = styled.button`
  background-color: red;
  width: 90px;
  height: 30px;
  border: none;
  border-radius: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin-left:10px;
`;

export const DefaultButton = styled.button`
background-color: grey;
  width: 90px;
  height: 30px;
  border: none;
  border-radius: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin-left:10px;
`