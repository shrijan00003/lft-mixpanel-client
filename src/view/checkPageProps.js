import React from 'react';
import Page from './pageView';
import ErrorBoundary from './errorBoundary';

import '../components/dashboard/dashboard.css';

class CheckPageProps extends React.Component {
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

export default CheckPageProps;
