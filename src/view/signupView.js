import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signupUser, checkUniqueEmail } from '../services/signupServices';

import '../components/signup/signup.css';

let userDetails = {
  name: [],
  phone: '',
  email: '',
  domain: '',
  company: '',
  password: '',
  re_password: '',
};

let $name = null,
  $email = null,
  $phone = null,
  $domain = null,
  $company = null,
  $password = null,
  $re_password = null;

let validName = false,
  validEmail = false,
  validPhone = false,
  validDomain = false,
  validCompany = false;

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      isSignedUp: false,
    };
  }

  //   FUNCTION TO SETS NAME
  setName = name => {
    const fullname = name.target.value.split(' ');
    if (fullname.length === 2 && fullname[0] !== '' && fullname[1] !== '') {
      validName = true;
      $name.innerHTML = '';
      userDetails.name = fullname;
    } else {
      validName = false;
      userDetails.name = fullname;
      $name.innerHTML = 'Provide first name and last name.';
    }
  };

  //   FUNCTION TO SET EMAIL
  setEmail = async email => {
    userDetails.email = email.target.value;

    if (
      userDetails.email !== '' &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userDetails.email)
    ) {
      validEmail = false;
      $email.innerHTML = 'Email is invalid.';
      return;
    } else {
      const count = await checkUniqueEmail(email.target.value);

      if (count.data.data > 0) {
        validEmail = false;
        $email.innerHTML = 'This email already exists.';
        return;
      }
    }
    validEmail = true;
    $email.innerHTML = '';
  };

  //   FUNCTION TO SET COMPANY
  setCompany = company => {
    validCompany = true;
    $company.innerHTML = '';
    userDetails.company = company.target.value;
  };

  //   FUNCTION TO SET PHONE
  setPhone = phone => {
    userDetails.phone = phone.target.value;

    if (userDetails.phone.length !== 10) {
      validPhone = false;
      $phone.innerHTML = 'Phone number must be of length 10';
      return;
    }
    validPhone = true;
    $phone.innerHTML = '';
  };

  //   FUNCTION TO SET EMAIL
  setDomainName = domain => {
    validDomain = true;
    $domain.innerHTML = '';
    userDetails.domain = domain.target.value;
  };

  //   FUNCTION TO SET PASSWORD
  setPassword = password => {
    userDetails.password = password.target.value;
    if (userDetails.password.length <= 5) {
      $password.innerHTML = 'Password length must be of minimum 5 characters';
      return;
    }

    $password.innerHTML = '';
  };

  //   FUNCTION TO SET RE PASSWORD
  setRePassword = rePassword => {
    userDetails.re_password = rePassword.target.value;
    if (userDetails.re_password !== userDetails.password)
      $re_password.innerHTML = 'Password not matched';
    else $re_password.innerHTML = '';
  };

  //   VAIDATION AND CALL API SERVICE ON SUCCESS
  signUp = async () => {
    const formField = [
      'Name',
      'Email',
      'Phone',
      'Domain',
      'Company',
      'Password',
      're_password',
    ];

    formField.forEach(field => {
      if (
        userDetails[field.toLowerCase()] === '' ||
        userDetails[field.toLowerCase()].length < 2
      ) {
        const $elem = document.getElementById(field.toLowerCase());
        const msg = field === 're_password' ? 'Confirm Password' : field;
        $elem.innerHTML = msg + ' cannot be empty';
      }
    });

    if (
      userDetails.password === userDetails.re_password &&
      validName &&
      validEmail &&
      validCompany &&
      validDomain &&
      validPhone
    ) {
      const res = await signupUser(userDetails);
      if (res.status === 201) {
        this.setState({
          isSignedUp: true,
        });
      } else {
        document.getElementById('internal_error').innerHTML =
          'Internal service error.';
      }
    }
  };

  componentDidMount = () => {
    $name = document.getElementById('name');
    $email = document.getElementById('email');
    $phone = document.getElementById('phone');
    $domain = document.getElementById('domain');
    $company = document.getElementById('company');
    $password = document.getElementById('password');
    $re_password = document.getElementById('re_password');
  };

  render() {
    return (
      <div className="body-wrapper">
        {this.state.isSignedUp ? (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                message:
                  "You're successfully registered, please login with your credentials.",
              },
            }}
          />
        ) : (
          <div className="col-4 col-s-7 signup-form-wrapper">
            <h2>Sign Up</h2>
            <hr className="hr-design" />

            <span className="form-success" id="internal_error" />
            <input
              onChange={name => this.setName(name)}
              type="text"
              placeholder="First and Last Name"
            />
            <span className="form-error" id="name" />

            <input
              onChange={email => this.setEmail(email)}
              type="email"
              placeholder="Email"
            />
            <span className="form-error" id="email" />

            <input
              onChange={phone => this.setPhone(phone)}
              type="text"
              placeholder="Phone"
            />
            <span className="form-error" id="phone" />

            <input
              onChange={company => this.setCompany(company)}
              type="text"
              placeholder="Company Name"
            />
            <span className="form-error" id="company" />

            <input
              onChange={domain => this.setDomainName(domain)}
              type="text"
              placeholder="Domain Name"
            />
            <span className="form-error" id="domain" />

            <input
              onChange={password => this.setPassword(password)}
              type="password"
              placeholder="Password"
            />
            <span className="form-error" id="password" />

            <input
              onChange={rePassword => this.setRePassword(rePassword)}
              type="password"
              placeholder="Confirm Password"
            />
            <span className="form-error" id="re_password" />

            <button
              className="signup-submit-button"
              onClick={() => this.signUp()}
            >
              SIGN UP
            </button>

            <hr className="hr-design" />
            <div className="signup-footer">
              <p>
                Already have account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignUp;
