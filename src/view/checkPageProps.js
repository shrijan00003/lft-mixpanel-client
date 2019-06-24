import React from 'react';
import Page from './pageView';
import { connect } from 'react-redux';

import ErrorBoundary from './errorBoundary';

import '../components/dashboard/dashboard.css';
import { getPage } from '../actions/pageActions';

let statusMessage = null;

const mapStateToProps = state => {
  if (state.page.isLoading) {
    statusMessage = 'Please wait...';
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    pageIsLoaded: state.page.isLoaded,
    pageIsLoading: state.page.isLoading,
    pageData: state.page.pageData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPage: async () => dispatch(getPage()),
  };
};

class CheckPageView extends React.Component {
  componentDidMount() {
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.pageData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <ErrorBoundary>
              <Page {...this.props} />
            </ErrorBoundary>
          </div>
        )}
      </div>
    );
  }
}

const EnhancedCheckPageView = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckPageView);

export default EnhancedCheckPageView;
