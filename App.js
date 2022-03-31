import "./font.css";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Publish from "./Publish";
import Modify from "./Modify";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Nav>
        <Title>신 조 어 사 용 법</Title>
      </Nav>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/Publish" exact>
        <Publish />
      </Route>
      <Route path="/Modify/:index" exact>
        <Modify />
      </Route>
    </div>
  );
}

const Nav = styled.div`
  background: #6a7ba2;
  /* width: 100; */
  display: flex;
  color: white;
  padding: 20px;
  font-size: 40px;
  margin: 0px;
`;

const Title = styled.span`
  color: #ffdfde;
  margin: auto;
`;

export default App;
