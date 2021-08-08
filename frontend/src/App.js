import "./App.css";
import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Houses from "./screens/Houses/Houses";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import CreateHouse from "./screens/CreateHouse/CreateHouse";
import UpdateHouse from "./screens/UpdateHouse/UpdateHouse";

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" component={() => <Houses search={search} />} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/create" component={CreateHouse} exact />
        <Route path="/house/:id" component={UpdateHouse} exact />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
