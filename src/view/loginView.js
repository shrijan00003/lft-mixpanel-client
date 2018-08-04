import React from 'react';
import auth from '../utils/auth';
import { connect } from 'react-redux';
import { login } from '../services/loginServices';
import { Redirect, Link } from 'react-router-dom';

import '../components/login/login.css';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

class UserLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailError: '',
      isLogedIn: false,
      errorMessage: '',
      passwordError: '',
    };
  }

  // SET EMAIL OR PASSWORD STATE
  setStateValue = (stateName, input) => {
    if (stateName === 'email') {
      this.setState({
        email: input.target.value,
        errorMessage: '',
        emailError: '',
      });
    } else if (stateName === 'password') {
      this.setState({
        password: input.target.value,
        errorMessage: '',
        passwordError: '',
      });
    }
  };

  //   LOGIN REQUEST
  requetLogin = async () => {
    const email = this.state.email;
    const password = this.state.password;

    const isValid = this.validateUser();
    if (isValid) {
      const loginResponse = await login(email, password);

      if (loginResponse.status === 200) {
        auth.authenticate(loginResponse);

        this.setState({
          isLogedIn: true,
        });
      } else {
        console.log(loginResponse.response);
        this.setState({
          errorMessage: loginResponse.response.data.message,
        });
      }
    }
  };

  //   VALIDATE USER DETAILS
  validateUser = () => {
    let emailErr = '',
      pwErr = '';
    if (!this.state.email) {
      emailErr = 'Email cannot be empty.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)
    ) {
      emailErr = 'Invalid email address';
    }

    if (!this.state.password) {
      pwErr = 'Password cannot be empty.';
    }

    if (emailErr != '' || pwErr != '') {
      this.setState({
        emailError: emailErr,
        passwordError: pwErr,
      });

      return false;
    } else {
      return true;
    }
  };

  // RENDERING LOGIN
  render() {
    return this.state.isLogedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="login-form">
        {/* <form> */}
        <h2>Login</h2>
        <hr className="hr-design" />
        <label className="register-success-message">
          <p>
            {this.props.location.state ? this.props.location.state.message : ''}
          </p>
        </label>
        <label>{this.state.errorMessage}</label>
        <input
          onChange={input => this.setStateValue('email', input)}
          name="email"
          type="text"
          placeholder="Enter email"
          autoComplete="off"
        />
        <label>{this.state.emailError}</label>
        <input
          onChange={input => this.setStateValue('password', input)}
          name="password"
          type="password"
          placeholder="Enter email"
        />
        <label>{this.state.passwordError}</label>
        <button onClick={this.requetLogin}>LOGIN</button>
        {/* </form> */}
        <hr className="hr-design" />
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
    );
  }
}

const userLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);

export default userLogin;
