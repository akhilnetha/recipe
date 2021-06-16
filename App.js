import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const RecipeImage = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  

`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChangeUpdate = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABj1BMVEUaGhoaGhsAAAAaGhgbGRsZGxgaGhwbGhkZGxr/uAAZGhsYGBgaGR8aGxUbGRwAABUAABATExMaGxafn58AAAsNDQ2bm5t5eXkeGBsXHBkYGiD/vAAcGB82NjYeFx0AABcaHBIAABtsbGwdFyEXHRceGRWPj4+lpaX/tQb/wRxVVVVzc3NMTEyHh4csLCwZHRATHxB+YRwAER4gFSAeGhAAERWthiogFSMUHhX/wxSJYxdhYWFBQUESHh41JAg0IhUNABe3ly3fsSfzuiDEly8kFxAnHxE4LQ4yJwteRg/Yoyp/ZBgbFCkWBgnxuRpxXRvdtiXKoChrRAuwhCNdTBGVdxxwURfprSmddCdNOBiRcCksDghDOhBHMRV4aSjMpihcPQ73yTOehBtoWSpVMhNWRiG5l0fLmCjipCiAYzGffi+4oEC8kkKEcCATAAq4hSuhiz+OgUczHxxPRQhjUgt2YgwAACPOkg5YTy/yriLctj4mKQ4dAAVKLxyzkBdUTiBjbV1waHafchTZqUQrLhBDR/gjAAAPVklEQVR4nO2ajVfbRpeHJUsjybK+LCQjjRRZRhJYScDYYGORGIhlPkzAxCXGQEmgeZO4oYU2m2xa0i7vbrt/+I4I2bObTdOcvrvg7JnnHBt9cc78fOfeufdqCAKDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYL4E2I9dJP/HwReLIJYA8IHpA4JmL7AFzqc9kqIIg2QFTwCA5hiOtElw3WP9azBQEASKNRxoTpdYhwa+ydlOfdqnWABnKb9uChIQfNNh61+oQhPZznE8J8GGsNHgSFZUbSM5r1fkYGFh0VmqUnS9Pud9dD4PPZzrGpLo1uslUULTk0LSbAZKIoAQ6lv3mnEYN1vzyxVTBV+mQEKiJI+b9qGkyfLK6sFaUFCyGQn4ECrtdStdLKYtKwr79xXIf6GzlKUZ4BIbhc2t1no/7sTN7r0tXRG86VQ5TltpJBFpTBfDezpBX/dY/xqqYJbsjc1eM0Q60khR2ori1pEib32DlFlWaF1cL1otDV73WP8aog38wtGDCIm7UGRdzMyo+1WMzuPt8sOt3nqiOx2WqxwHoUoJgkH5hu1f98g/F1qg5HLHKhatTvO81uvVWs1OaCUi0+nztbxsym+0nSayYbqfMl3WoETfZFjS9KXrHvnn4tL5rdgqWv3dvaxceFPIF5w9NGUT52tpDVN0xUaj4nbRE+l2Ia9oSl5u1CUBMsZ1j/xzIeFajLytN6s0pktBIHKc6er61gOr2F/OzBgZhqdnhPppC7nnbrnbR5Fo/+sCT6mueN0j/1xY7RyJOZDNku95tkCIquBJUkHbjk6WaJFFCQ/hBqK9uZ4Oo8i6iKzhk8ClBfO6R/6ZkPBRGPX3qmzgeLYk1k3CmbFN4Jja4wOP5yAjEpAjBCn7LEbRxgrDEIWd8HBlznOve+ifi1Kz4p2KwHNCMEtxyLuAyQGV8EA1YxI0TamsJEEgAA3N07Pt8s78eojCTndJ+GL8UGumW7LhUiRn+q7ksaIISJryOVoSGAolrRLJc7zrMfWjb54sFiqVN9p9ZM3ofr7E0hJLsfx1C/gz+Nm42K4YPvWph2gX8Ozp3zQGHXO8toNmalPzJWR4X/zkPw4DzFocbwIafnKgnuf60Nu4zNpMrWul40XG90kUh7irGOU/Ar9aPJQpUWA+9ZDEqBz06+67MzpfjqzoANrsLGszw69wLT7MUy77yQzFF1VakMx3tQVJwaehFS03aJXzXXboZympNbuyS6ifrP14SNIGa1+eidVHcTr8almuQCipQ29DMt+KNd5T1U89JFLIVKJwaS7Xe41y1ig+LM8UeNq5ilH+Q1S3wvamAgiWQCpQSi0JJABIEUCrPbpEkeibtiEHAHPZduO1J2FSTxXD5v1N6KL6kgAsObw9uYzeifsnVYGyWcBJBs0wgulKkK9W85UqZDiOEejkyxPApQ2Z4NnO/PZ6iErHdHdVt/kSxfvSJ0PVtcLvoYE2F3jetiGhGsS0a9gwr+2Vd3d79w90pWry6IYYsOJ7X+WhLRfkzaPzpILst5UgoOZMdmgbAKS8b3W68881HggCIzICsOeUg/NmHFkX/ZnB/GKq4kk+Cqf8pZl46DgGqoXlp99aqDB+qBgO26CHViHB6+u9x9/V2llKpSkGmr5y0A2TMv+io4EqifjeUbVq0zxjXNoQ+JxZr9MeFFLn6IH4IG+UzCGuh8Xqi/3nx+XvTm27RAOBT/12FkVJf6YTx2HSpLHCuNuWN1jqfVZAoTJEIGhBAPXTAbLietYHtj+8jbhl4fT73ZPvTl4sQZFm/NNWmPRnBvPtg9W9vde9VoxUFsPunmz+Z2NGMgyaqouGz3orffT0SRXODLFCe3rj4fF388fPl33fFlIt5H7hD6ua4nlZs+FVtaBdQyKjzvbXMkT1MoLk63XKMWiWhVzlYYiizQq0P/5+ZygwGKj9WP6+dv9xYdZrrKDKKH5YABx/scCRPM9AWftqHcWduLwkEKi2UmmUH0iOwdisb1PaulWM5vNgiJM3loDG2o+1+e9/XJszK69D68HTJeK/9mBIgqkoRwNkx/W2zFNzXn3a9ykarR6uKBjyfeS0A8Vkh3fFV0u2ozwuPz/ef6mU8ttW2JYbzgeR0QVQa7diK64tViAnMpBRVWACQPCGsJpMU50f3vWQACCAROr5/v7LA+DKXauvNRrBB4U75xhsXm4fhtZZWZFmHBol4hTHQA/9r4YShngF0sO7XMA5A1W3r14+02Y3jOUH6YHiQ+ODfjaQbM40s1q5b6GoWoB1E9KGB3gbBJ6GYm+4BsnhVWg6YskknH9SvHqw0Y6snux69AedQoEo+b6v2rJei6NvzldlWOdsWhRFKqgsoCw8XobE8OalNDBo5FdMQzLVQs8Ktyrm7AejZQOmoRozDAdM+agbIndcUKBv2jRFu/ldq5huKjQ3xAo5mmRIwEsBzxZaVmdV8Og5lyZN3wSUSNESqfqEwImUZEOzRHqn9x+glWP7QKk2BL4h73WsdNhT/qRJMAxwQsBllvtWX2bMEsWhrEWyvY1KRc7n8wW5UvHsjM/xqmc7hV+66aLV+XZ/7zS1dhKjDPbBou1Sw7taXEJxvN/Yi9HSNusCwWlUCkqw+qq836ttb9eO98vtVVWWPYOdnpaUJI8Ji1YYFlEctdLftBXDI4Z4yX9HYEK/Wg6tWsGjnMLS2ute9yLxTt4nJm8Vw7g/6L2y8w0IkyZGsROj4gq5oFUcHGiGyQ+/QoP3gIbW+51KRVk9GZyFF9LC9yQnyHDN3qMlw3uFDNhbK/92fjgYPPn7adWnS3VqePPSS0hG8PV+Ol5QdgZxlJRM663a/P12++hZu/36n3vn3Wbnouo4X3vzCs3S3TdoHiuaIlfrLIQ2SnOuW8GfwbGsvxCjnKUZpsPmvZNXy4pSqVYu8Lx8XtY2H5Vb6CbKwBeQSXerhgkIyFOGarCMHXBD31Wsc3T1dVgsRp1m70jTKhCR9NpUUWVZmiY4HsKKkkLZaRT+1LGKu1UPcr5JsKTHqIAKhr9vyrKlfA052nZbzmf5jy9uJOSzhcVeM53M0srwptofZ8bx5bf9/ZVCFvj+H+ycMQzV573CSi1MR73CJ3vIQwjVaCw//jXPsKLJ2MbH337SlGoLrtvQ2n2rlx/60PIB7jQ3o9TrAkcFhtRofPQZHgpBYBiSWT3tHheGtzHzcQybnzVEylFtj/H/4D0NAIAVUHJqOHD655kvZsfQJYZdsmmJtglGcBz6D+wjCQzgUPrC2rwpDOMST5Eo+BMC4IAgsB+4Ece7gsiZgKRE33/fVyJJikluEYwJVIZQHTYQXdvjkKsGhkuwPghYRgA+D1UG8IYgkCTv86zJcbwkcQwIrlggBySK8QFDswFt059lAlT1CjZBGZ6PPmDa5g3RdHjeYDhRRQkqQxtEQ3BZgaWFgDc4zk82c1ISzUCD8m0uEP6vNf13GEKSPEiINkurIuN+TqoMaCMQWc8BjIFSc0msCzNGMDvrI8OxhmhLLrANN5ibQT8XOndpNfA93zQMoAYl4EH7inczApGmODDneKrZaMDP+HkzBGmr4rQPiWkemL4053CNDUdU7WlgCxDyUCxxEHAuA2GdgtAUZwQaHUpBwAr0tIAqqiuORkDVs25pLkhpiuI5AZfV9eRyNoXQkxeJeoa4uJRJZdG3rk9N6YrKN/RTp5HXfjUCre5rSkrJe4DN66ureh4ldqebksCfKnXjNLmlo0NdbfBLp0Hdc1SxfrUKmancmO7KJ/HZWad3Og1ujE8iPfqd8fHxyZspQr+Vu5FJLmVu525nidRYbmQkN5adSdWaD5X95vPq6/7+s7M4PmuuNH7d7Ydh/95idbH5uzK7efhWL/xw1unEx6laXC7UC7W3q3WHFT69w+N/n8zUxJgONh53B4PDrY2GPjoycSNL6GMjk5O5iUk9NTpyg8iN3Eplb0/czOqTE+NjY+MTkzPyD2H7YdicVcpR79ngLOp3V35ZjzpnZ3EUry12moqw1D/7tbBuDQbdk9S51fmXevU82ms4IhSuONKoSKFLbegaQhdUNjeeG00lCm+kMqMjN98pzI3cTSGFqTsjoyldV+5M+Wi489/01+DG66gnK7XomaK0wvO/L+trx7X8SqevVVPNcDN1GC2spJTCIJ1eT8mtaK8i+eRVb5i6sCGRuXEbcSOj35m4PTmCvA8pzGaIkcl3CifHx4lE4Xjuwis1zdfOUTn8tMJUkcKC/CR6KK8057WqIwja4789i+P9ly9+77580futXH75szYIB9GT1Hl0AE3BUa840rxTiBRNTKCD1Pi4fnvijp4oRFpy45cKb0/cujtxMzknyLF/Hfu320qrmO6s8GplJ0QKt62dysFbhYElaM5sHm9v/za/c7CJYpWSV7TUy1QrfDoI29vhHjQZWrriPaiXCpHt7t6dyt6dmLx5Jzd+oTBLZHPvbYj+jF3YMJUhRxC3kEF+iw51KlFYUWrhTmU5vq/BOqzKL5897TRfIBuuv3x53Hv84uXPyiA8WO48+Cl8JJgmZV9DpEkliqZSqWxqFIXKkcTrEj9MjU3cea+QGB/JJX54S0eT9NbEXWU7OtiNtrVklipyLWxXkR+2jhZmF3o15RcUaaqpfpzS1qOvN1OaPAiPKluRFe1tmKZKX3GkIaYmxkcns3dQ7Jy8iRxv6sbUDRRPxkZGRydHxon3CrO3cyM3dR2F0Ts3RydGdRRLH2rdcP7NRaTZDney9dVmGHb6cfQ2WIz7eV7rx5uFQ+un9fV9pRUdNQrbVnSwwXOUesWN8MxUbnw8l0nWv9zNOyN3s5mMPprjxnK53PgtIjm+QYwjG6Zu5W6ie2O5iQm0HrL6cfNZdeHb39fazZMl7cfmww2hsbjb74TN2iN7bb2l+Zutt5tvvm82+/1j5Ulzr+Ett94e2JIkUle9vTaTRbz7ziQ5GSJJXjLokv7ugYtrFxdRKkBMTfk6TTbErMjBWVfkHdUIKpuqjQoszf33RaPqso1sFrAzbt2gZjchKjwcI3A9NtA3Z13bFplhr5IzmaQA4XmeQ4VJhuCTjW3v+6J8RoI8xfLJ/lKS5wmWYJgMT5AMQ5Asy6EP+nuto8dgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGMz/M/4DjF9ZWJqybu4AAAAASUVORK5CYII=" alt="not "/>
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChangeUpdate}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKOJJynb3E1EjFMWQMIx7M_YiXy5W3SmSYA&usqp=CAU" 
            
          />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
