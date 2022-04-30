import React from 'react';
import "./App.scss";
import {Container} from "react-bootstrap";
import Content from "./components/Content";

function App() {
  return (
   <Container className={"app-container"}>
           <Content/>
   </Container>
  );
}

export default App;
