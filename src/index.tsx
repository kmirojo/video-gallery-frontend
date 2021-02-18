import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import VideoList from "./components/videos/VideoList";
import VideoForm from "./components/videos/VideoForm";
import Navbar from "./components/navabar/Navbar";

import "react-toastify/dist/ReactToastify.css";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />

            <div className="container p-4">
                <Switch>
                    <Route path="/" component={VideoList} exact />
                    <Route path="/new-video" component={VideoForm} exact />
                    <Route path="/update/:id" component={VideoForm} exact />
                </Switch>
                <ToastContainer />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
