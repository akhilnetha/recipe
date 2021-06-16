import styled from 'styled-components'
export  const RecipeListContainer=styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 20px;
font-size: 10px;
justify-content: space-evenly;

`;
export  const RecipeContainer=styled.div`
display:flex;
flex-direction:column;
padding:30px;
margin:5px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa;
`

export const RecipeName=styled.span`
font-size: 18px;
font-weight: bold;
color: black;
margin: 8px 0 ;
`;
export  const IngredientsText=styled.span`
font-size: 18px;
border: 1px solid green;
font-weight:bold;
text-align: center;
text-transform: capitalize;
margin: 10px 0;
padding:8px 12px;
border-radius: 5px;
color: green;
cursor: pointer;
`;
 export const SeeMoreText = styled( IngredientsText)`
color:red;
border:1px solid red;
`
