import React from 'react';
import auth from '../utils/auth';
import { connect } from 'react-redux';
import {
  fetchProfileBegin,
  fetchProfileSuccess,
  fetchProfileFailure,
} from '../actions/profileActions';
import { fetchProfile } from '../services/profileServices';
import { USER_NAME } from '../constants/authConstants';

import '../components/profile/profile.css';

let statusMessage = null;
let loginResponse = null;

const mapStateToProps = state => {
  if (state.profile.isLoading) {
    statusMessage = 'Please wait...';
  } else if (state.profile.error) {
    statusMessage = state.profile.error.data.message;
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    isLoaded: state.profile.isLoaded,
    isLoading: state.profile.isLoading,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: async () => {
      dispatch(fetchProfileBegin());
      loginResponse = await fetchProfile();
      if (loginResponse.status === 200) {
        dispatch(fetchProfileSuccess(loginResponse.data));
      } else {
        dispatch(fetchProfileFailure(loginResponse.response));
      }
    },
  };
};

class ProfileView extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchUserProfile();
    }
  }

  render() {
    return (
      <div className="container row">
        <div className="col-12">
          <div className="col-12">
            <div className="profile-title">
              <h2>My Profile</h2>
              <hr className="seperator-hr" />
            </div>
          </div>

          {this.props.profileData === null ? (
            <span>{this.props.statusMessage} </span>
          ) : (
            <div>
              <div className="col-4">
                <div className="profile-pic-section">
                  {/* <h2>Profile Picture</h2> */}
                  <div className="profile-pic-uploader">
                    <div className="profile-pic">
                      <img
                        src={require('../images/dp.jpg')}
                        alt="profile pic"
                      />
                    </div>
                    <label>
                      Update Picture
                      <input
                        type="file"
                        name="profilePicUpload"
                        id="profilePicUpload"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="profile-info-section">
                  <div className="profile-info">
                    <label>Full Name</label>
                    <input
                      type="text"
                      defaultValue={this.props.profileData.userFullName}
                      name="fullName"
                      pattern="[A-Za-z\s]+"
                      required
                    />
                    <label>API key</label>
                    <input
                      type="text"
                      defaultValue={this.props.profileData.clientId}
                      name="apiKey"
                      readOnly
                    />
                    <label>Username</label>
                    <input
                      type="text"
                      defaultValue={auth.getStoreState(USER_NAME)}
                      name="userName"
                      readOnly
                    />
                    <label>Phone Number</label>
                    <input
                      type="number"
                      defaultValue={this.props.profileData.userPhone}
                      name="phone"
                    />
                    <label>Email</label>
                    <input
                      type="email"
                      defaultValue={this.props.profileData.userEmail}
                      name="email"
                    />
                    <label>Company Name</label>
                    <input
                      type="text"
                      defaultValue={this.props.profileData.companyName}
                      name="companyName"
                    />
                    <label>Domain Name</label>
                    <input
                      type="text"
                      defaultValue={this.props.profileData.domainName}
                      name="domainName"
                    />

                    <label>Description</label>

                    <textarea type="text" name="description">
                      {this.props.profileData.description}
                    </textarea>
                  </div>
                </div>
              </div>
              <div>
                <hr className="seperator-hr" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);

export default Profile;
