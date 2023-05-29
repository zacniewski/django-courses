import React, { Component } from "react";
import CourseDataService from "../services/CourseService";
import { withRouter } from '../utils/WithRouter';

class Course extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.removeAllCourses = this.removeAllCourses.bind(this);

    this.state = {
      currentCourse: {
        id: null,
        title: "",
        description: "",
        published: false,
        added: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCourse(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCourse: {
          ...prevState.currentCourse,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCourse: {
        ...prevState.currentCourse,
        description: description
      }
    }));
  }

  getCourse(id) {
    CourseDataService.get(id)
      .then(response => {
        this.setState({
          currentCourse: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    let data = {
      id: this.state.currentCourse.id,
      title: this.state.currentCourse.title,
      description: this.state.currentCourse.description,
      published: status,
      added: this.state.currentCourse.added
    };

    CourseDataService.update(this.state.currentCourse.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCourse: {
            ...prevState.currentCourse,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCourse() {
    CourseDataService.update(
      this.state.currentCourse.id,
      this.state.currentCourse
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The course was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCourse() {
    CourseDataService.delete(this.state.currentCourse.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/courses');
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeAllCourses() {
    CourseDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCourse } = this.state;

    return (
      <div>
        {currentCourse ? (
          <div className="edit-form">
            <h4>Course edition</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title"><strong><u>Title:</u></strong></label>
                <input
                  type="text"
                  className="form-control mb-2 mt-2"
                  id="title"
                  value={currentCourse.title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><strong><u>Description:</u></strong></label>
                <input
                  type="text"
                  className="form-control mb-2 mt-2"
                  id="description"
                  value={currentCourse.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentCourse.published ? " Started" : " Waiting to start"}
              </div>
            </form>

            {/* publish or unpublish the course */}
            {currentCourse.published ? (
              <button
                className="m-2 btn btn-sm btn-primary"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="m-2 btn btn-sm btn-primary"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            {/* updating course */}
            <button
              type="submit"
              className="m-3 btn btn-sm btn-warning"
              onClick={this.updateCourse}
            >
              Update
            </button>

            {/* deleting course */}
            <button
              className="m-2 btn btn-sm btn-danger"
              onClick={this.deleteCourse}
            >
              Delete
            </button>

            {/* deleting all courses - use with caution!!! */}
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllCourses}
            >
              Remove all courses (be careful!!!!)
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p className="text-dark"> &#x2190; Click on a course to get <span className="badge bg-secondary"> information</span></p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Course);