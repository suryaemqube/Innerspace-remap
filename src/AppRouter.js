// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Posts';
// import Posts from './components/Posts';
// import NotFound from './components/NotFound';
function NoMatch() {
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="posts" element={<Posts />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
