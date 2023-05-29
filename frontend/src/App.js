import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import About from "./components/AboutComponent";
import AddCourse from "./components/AddCourseComponent";
import Course from "./components/CourseComponent";
import CoursesList from "./components/CoursesListComponent";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/courses"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/courses"} className="nav-link">
                List of courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add course
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CoursesList/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/courses" element={<CoursesList/>} />
            <Route path="/add" element={<AddCourse/>} />
            <Route path="/courses/:id" element={<Course/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
