// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Post';
// import Posts from './components/Posts';
// import NotFound from './components/NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
         <Route path="/Posts" element={<Posts />} />
        {/*<Route path="/posts" component={Posts} /> */}
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
