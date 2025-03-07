import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import {
  Home,
  Team,
  ContactPage,
  Login,
  Register,
  PageNotFound,
  Project,
  Timesheets,
  ProjectForm,
  TeamForm,
  CalenderView,
  Profile   
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/team" element={<Team />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
          <Route path="/project" element={<Project />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/project/*" element={<ProjectForm />} />
          <Route path="/team/*" element={<TeamForm />} />
          <Route path="/calender" element={<CalenderView />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);
