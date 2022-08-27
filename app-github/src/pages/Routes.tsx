import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Commit } from "./Commits";
import { Home } from "./Home";


const RoutesApp = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/commits" element={<Commit/>}/>
      </Routes>
    </BrowserRouter>
  )
};
export { RoutesApp };