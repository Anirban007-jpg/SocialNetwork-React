import React from 'react';
import Posts from '../post/Posts';

const Home = () => {
    return (
      <>
        <div className="jumbotron">
          <h2>HOME</h2>
          <p className="lead">Welcome to react Frontend</p>
        </div>
        <div className="container">
          <Posts />
        </div>
      </>
    );
}

export default Home;

