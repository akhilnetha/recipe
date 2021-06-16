import styled from "styled-components";
export const Header=styled.div`
color: white;
background:black;

display: flex;
flex-direction: row;
align-items: center;
padding: 20px;
font-size: 25px;
font-weight: bold;
justify-content: space-between;


`
 export const AppNameComponent=styled.div`
display:flex;
align-items:center;`
 export const AppIcon=styled.img`
width:38px;
height:38px;
object-fit:contain;
margin:15px;
`
export const SearchComponent=styled.div`
display: flex;
align-items: center;
background-color: white;
padding: 10px;
border-radius: 19px;
width: 50%;

`;
export const SearchIcon=styled.img`
width:22px;
height:22px;
cursor: pointer;`


  export const SearchInput=styled.input`
border:none;
outline:none;
margin-left:10px;

font-size:16px;
font-weight:bold;

@media(max-width:600px){
    width: 60px;
   

}
@media(max-width:260px){
    font-size: 2px;
}

`