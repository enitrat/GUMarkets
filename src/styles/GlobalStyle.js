import React from 'react';
import styled from "styled-components"

export const activeTab = styled.button`
  border:0;
  border-bottom:2px solid purple;
  outline:0;
  color:white;
`
export const inactiveTab = styled.button`
  border:0;
  border-bottom:2px solid grey;
  outline:0;
  color:white;
`

export const BackgroundWrapper = styled.div`
  background-image: linear-gradient(to right, rgb(50, 50, 50) 10%, transparent), linear-gradient(to top, rgb(2, 2, 2) 1%, transparent), url(https://blog.godsunchained.com/wp-content/uploads/2019/12/atlas_header.jpg);
  background-position: left top;
  background-repeat: no-repeat;
  color:white;

`

export const Parallax = styled.div`
background-image: linear-gradient(to right, rgb(50, 50, 50) 10%, transparent), linear-gradient(to top, rgb(2, 2, 2) 1%, transparent), url(https://blog.godsunchained.com/wp-content/uploads/2019/12/atlas_header.jpg);
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
color:white;
min-height: 900px;
margin-top:75px;
width:100%;

`

export const SearchBar = styled.input`
  border: 0;
  border-bottom: 2px solid yellow;
  outline: 0;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  font-family: inherit;

  &::placeholder{
    color:white;
  }

`


export const SearchWrapper = styled.div`
  display:flex;
  justify-content:center;
  padding-top:10px;
  position:sticky;
  z-index:100;
  top:75px;
  
`

export const CollectionWrapper = styled.div`
 background: rgb(176,191,201);
 background: linear-gradient(90deg, rgba(176,191,201,1) 0%, rgba(115,125,158,1) 21%, rgba(113,110,163,1) 51%, rgba(56,47,115,1) 79%, rgba(21,9,78,1) 100%);

`

export const CardWrapper = styled.div`
  display:flex;
  flex-direction: row;
  margin:10px;
  padding:0px;
  border-radius:10px;
  justify-content:center;
  background:rgba(58, 74, 115, 0.15);

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