import React from 'react';
import history from './history'

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <button onClick={() => history.goBack()}>Go Back</button>
  </div>
);

export default NotFound;
