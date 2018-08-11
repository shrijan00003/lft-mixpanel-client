import React from 'react';
import '../components/notFound/notFound.css';

const NotFound = ({ location }) => (
  <div className="container row">
    <div className="col-5 col-s-10 not-found-404-wrapper">
      <div className="">
        <h3>
          <code>{location.pathname}</code>
        </h3>
        <h1>404</h1>
        <p>The page you are looking for is not found.</p>
      </div>
    </div>
  </div>
);
export default NotFound;
