// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout'
import Home from './pages/Home';
import Posts from './pages/Posts';
// import Posts from './components/Posts';
import NoPage from "./pages/NoMatch";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//     }, {
//         path: "posts",
//         element: <Posts />,
//     }, {
//         path: "*",
//         element: <NoMatch />
//     }
// ])
const AppRouter = () => {
    return (
        // <RouterProvider router={router} />
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Posts />} />
                    {/* <Route path="contact" element={<Contact />} /> */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
