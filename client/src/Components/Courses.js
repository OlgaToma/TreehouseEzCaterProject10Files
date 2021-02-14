import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';

// List all courses
export default class Courses extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    state = {
        courses: []
    }

    // When the component mounts, retrieve the courses
    componentDidMount() {   
        this.data.getCourses()
            .then(data => {
                this.setState({courses: data});
            });        
    }

    render(){       

        return(
            <div className="bounds">
                <>
                {this.state.courses.length > 0 && (
                    this.state.courses.map((course, i) => (
                        <div className="grid-33" key={i} >
                            <Link to={{ pathname: `courses/${course.id}`}} className="course--module course--link">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        </div>
                    ))
                )}
                </>
                <div className="grid-33">
                    <Link to='/courses/create' className="course--module course--add--module">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>

            </div>
        )
    }
}