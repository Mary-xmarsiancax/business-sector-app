import React from 'react';
import "./App.scss";
import {Container} from "react-bootstrap";
import Content from "./components/Content";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <Container className={"app-container"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path=":page" element={<Content/>}/>
                        <Route index element={<Navigate to="/0" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
