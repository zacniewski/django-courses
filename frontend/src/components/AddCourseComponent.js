import React, { Component } from "react";
import CourseDataService from "../services/CourseService";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.newCourse = this.newCourse.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,
      added: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveCourse() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    CourseDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          added: "",
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCourse() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      added: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You've added new course!</h4>
            <button className="btn btn-success" onClick={this.newCourse}>
              Add another course!
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h4>Adding new course</h4>

              <label htmlFor="title"><strong><u>Title:</u></strong></label>
              <input
                type="text"
                className="form-control mb-2 mt-2"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"><strong><u>Description:</u></strong></label>
              <input
                type="text"
                className="form-control mb-2"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveCourse} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
