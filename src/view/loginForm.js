import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import '../components/login/login.css';

let $pwErr = null;
let $emailErr = null;

class UserLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  // SET EMAIL OR PASSWORD STATE
  setStateValue = (stateName, input) => {
    if (stateName === 'email') {
      $emailErr.classList.remove('show-tooltip');
      this.setState({
        email: input.target.value,
        errorMessage: '',
        emailError: '',
      });
    } else if (stateName === 'password') {
      $pwErr.classList.remove('show-tooltip');
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
      this.props.loginUser(email, password);
    }
  };

  //   VALIDATE USER DETAILS
  validateUser = () => {
    let emailErr = '',
      pwErr = '';
    if (!this.state.email) {
      emailErr = 'Email cannot be empty.';
      $emailErr.classList.add('show-tooltip');
    }
    //  else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)
    // ) {
    //   emailErr = 'Invalid email address';
    //   $emailErr.classList.add('show-tooltip');
    // }

    if (!this.state.password) {
      pwErr = 'Password cannot be empty.';
      $pwErr.classList.add('show-tooltip');
    }

    if (emailErr !== '' || pwErr !== '') {
      this.setState({
        emailError: emailErr,
        passwordError: pwErr,
      });

      return false;
    } else {
      return true;
    }
  };

  componentDidMount = () => {
    $pwErr = document.getElementById('pw_error');
    $emailErr = document.getElementById('email_error');
  };

  // RENDERING LOGIN
  render() {
    return this.props.isLogedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="col-3 col-s-7 login-form">
        {/* <form> */}
        <h2>Login</h2>
        <hr className="hr-design" />
        <label className="register-success-message">
          <p>
            {this.props.location.state ? this.props.location.state.message : ''}
          </p>
        </label>
        <label>{this.props.loginStatus}</label>
        <input
          onChange={input => this.setStateValue('email', input)}
          name="email"
          type="text"
          placeholder="Email or Username"
          autoComplete="off"
        />
        <div className="tooltip" id="email_error">
          <span className="tooltiptext">{this.state.emailError}</span>
        </div>
        <input
          onChange={input => this.setStateValue('password', input)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="tooltip" id="pw_error">
          <span className="tooltiptext">{this.state.passwordError}</span>
        </div>
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

export default UserLogin;
