import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';
import ReactMarkdown from 'react-markdown'

// Create the course detail component
export default class CourseDetail extends Component {
    constructor() {
        super();
        this.data = new Data();
        this.authUser = false;
    }

    state = {
        course: {
            title:'',
            description:'',
            estimatedTime:'',
            materialsNeeded:'',
            user: {
                firstName:'',
                lastName:''
            }
        },
        errors: []
    }

    componentDidMount() { 
        const { context } = this.props;
        this.authUser = context.authenticatedUser;
        const courseId = this.props.match.params.id;

        this.data.getCourse(courseId)
            .then(data => {
                this.setState({course: data});
            });        
    }

    deleteCourse = (event) => {
        const { context } = this.props;
        const { course } = this.state;
        const { emailAddress, password } = context.authenticatedUser;
        this.data.deleteCourse(course.id, emailAddress, password)
            .then(data => {
                if(data.length > 0) {
                    const errors = data;
                    this.setState(() => {
                        return { errors };
                    });
                } else {
                    this.props.history.push(`/`);
                }
            });        
    }

    render(){

        const {
            course,
            errors,
          } = this.state;

        return(
            <>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {(this.authUser && course.user.id === this.authUser.id) &&
                        <>
                            <Link to={{pathname:`/courses/${course.id}/update`}} className="button">Update Course</Link>
                            <button onClick={this.deleteCourse} className="button button-secondary" style={{cursor:'pointer'}} >Delete Course</button>
                        </>
                        }
                        <Link to='/' className="button button-secondary">Return to List</Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
            {errors.length > 0 &&
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}   
                </ul>
                </div>
            </div>
            } 
                
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>By {course.user.firstName} {course.user.lastName}</p>
                    </div>
                    <div className="course--description"><ReactMarkdown children={course.description} /></div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><ReactMarkdown children={course.materialsNeeded} /></div>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </>
        )

    }

}