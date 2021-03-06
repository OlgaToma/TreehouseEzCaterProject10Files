import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email " />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      name,
      emailAddress,
      password
    } = this.state;
    
    let firstName = '';
    let lastName = '';
    const nameParts = name.split(' ');
    if(nameParts.length === 2) {
      firstName = nameParts[0];
      lastName = nameParts[1];
    } else {
      firstName = name;
      lastName = name;
    }

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data.createUser(user)
      .then( errors => {
        if(errors.length) {
          this.setState({errors});
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/');
            })
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error')
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
