import React, { Component } from "react";
import CourseDataService from "../services/CourseService";
import { Link } from "react-router-dom";

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCourses() {
    CourseDataService.getAll()
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCourses();
    this.setState({
      currentCourse: null,
      currentIndex: -1
    });
  }

  setActiveCourse(tutorial, index) {
    this.setState({
      currentCourse: tutorial,
      currentIndex: index
    });
  }

  searchTitle() {
    CourseDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, courses, currentCourse, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-xl-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <h4>Courses List</h4>

          <ul className="list-group">
            {courses &&
              courses.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCourse(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
        </div>

        <div className="col-xl-6">
          {currentCourse ? (
            <div>
              <h4>Course information</h4>
              <div className="mb-2">
                <label>
                  <strong><u>Title:</u></strong>
                </label>{" "}
                {currentCourse.title}
              </div>

              <div className="mb-2">
                <label>
                  <strong><u>Description:</u></strong>
                </label>{" "}
                {currentCourse.description}
              </div>

              <div className="mb-2">
                <label>
                  <strong><u>Status:</u></strong>
                </label>{" "}
                {currentCourse.published ? "Started" : "Waiting to start"}
              </div>

              <div>
                <label>
                  <strong><u>Added:</u></strong>
                </label>{" "}
                {currentCourse.added}
              </div>

            {/* editing course */}
              <Link
                to={"/courses/" + currentCourse.id}
                className="m-3 btn btn-sm btn-warning"
              >
                Edit course
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p className="text-dark"> &#x2190; Click on a course to get <span className="badge bg-secondary"> information</span></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
