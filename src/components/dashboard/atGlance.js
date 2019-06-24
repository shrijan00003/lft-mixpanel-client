import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderAtGlance = ({ icon, title, data, percentage, isIncreased }) => {
  return (
    <div className="col-3">
      <div className="dashboard-at-glance">
        <p>
          <FontAwesomeIcon icon={icon} /> {title}
        </p>
        <h1>{data}</h1>
        <p>
          {title === 'Active Users' ? (
            <span>Total live users currently.</span>
          ) : isIncreased ? (
            <span>
              <span className="is-increased">
                <FontAwesomeIcon icon="caret-up" />
                {percentage}%{' '}
              </span>
              from the last week.
            </span>
          ) : (
            <span>
              <span className="is-decreased">
                <FontAwesomeIcon icon="caret-down" />
                {percentage}%{' '}
              </span>
              from the last week.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default renderAtGlance;
