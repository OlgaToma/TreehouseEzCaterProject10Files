import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';
import ReactMarkdown from 'react-markdown'
import Form from './Form'

export default class CourseUpdate extends Component {
    constructor() {
        super();
        this.data = new Data();
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
        const courseId = this.props.match.params.id;
        this.data.getCourse(courseId)
            .then(data => {
                this.setState({course: data});
            });        
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let { course } = this.state;
        course[name] = value;
        this.setState(() => {
            return {
                course
            };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { context } = this.props;
        const { course } = this.state;
        const { emailAddress, password } = context.authenticatedUser;
        this.data.updateCourse(course, emailAddress, password)
            .then(data => {
                if(data.length > 0) {
                    const errors = data;
                    this.setState(() => {
                        return { errors };
                    });
                } else {
                    this.props.history.push(`/courses/${course.id}`);
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
            <form name="course" onSubmit={this.handleSubmit}>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} defaultValue={course.title}/></div>
                        <p>By {course.user.firstName} {course.user.lastName}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} defaultValue={course.description}/></div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.change} defaultValue={course.estimatedTime}/></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change} defaultValue={course.materialsNeeded} /></div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Update Course</button>
                    <Link to={{pathname:`/courses/${course.id}`}} className="button button-secondary">Cancel</Link>    
                </div>
            </form>
            </>
        )

    }

}