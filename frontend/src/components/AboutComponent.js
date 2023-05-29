import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
        <div className="list-group col-xl-8 d-flex justify-content-center">
            <h4>About this page</h4>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">The idea behind</div>
                        <ul>
                            <li>
                                You can add courses you want to finish.
                            </li>
                            <li>
                                You can modify title, description and status of the given course.
                            </li>
                            <li>
                                You can delete single course or remove all courses at once.
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Technologies used in backend</div>
                        <ul>
                            <li>
                                <a href={"https://www.djangoproject.com/"}>Django</a>
                            </li>
                            <li>
                                <a href={"https://www.django-rest-framework.org/"}>Django Rest Framework</a>
                            </li>
                            <li>
                                <a href={"https://pypi.org/project/django-cors-headers/"}>Django CORS Headers</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Technologies used in frontend</div>
                        <ul>
                            <li>
                                <a href={"https://react.dev/"}>React</a>
                            </li>
                            <li>
                                <a href={"https://reactrouter.com/en/main/start/tutorial"}>React Router</a>
                            </li>
                            <li>
                                <a href={"https://axios-http.com/docs/intro"}>Axios</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Repository</div>
                        Link to <a href={"https://github.com/zacniewski/django-courses"}>Github</a>
                    </div>
                </li>
            </ol>
        </div>
    );
  }
}
