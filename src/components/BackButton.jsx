import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
  
      <Button variant="outline-dark" className="m-2" onClick={() => window.history.back()}>
        <i className="fa fa-arrow-left mr-1"></i>Back
      </Button>
 
  );
};

export default BackButton;