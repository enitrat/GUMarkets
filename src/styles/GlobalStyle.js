import React from 'react';
import styled from "styled-components"

export const SearchWrapper = styled.div`
  display:flex;
  justify-content:center;
  padding-top:10px;
  
`

export const CollectionWrapper = styled.div`
 background:#C2C7D8;
`

export const CardWrapper = styled.div`
  display:flex;
  flex-direction: row;
  margin:2px;
  padding:2px;
  border-radius:5px;
  justify-content:center;
  background:#DADADC;

`

export const InfoWrapper = styled.div`
  padding-right:10px;
  padding-left:10px;

  display:flex;
  justify-content:space-between
`

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

export const SpinnerWrapper = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top:10%;
  display:flex;
  justify-content : center;
`