// src/App.js
import React from 'react';
import AppRouter from './AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
        <AppRouter />
    </div>
    </ApolloProvider>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
