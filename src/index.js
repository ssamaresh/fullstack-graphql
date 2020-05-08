import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './components/App';
import client from './client';
import './index.css';

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDom.render(<Root />, document.getElementById('app'));

if(module.hot) {
  module.hot.accept();
};
