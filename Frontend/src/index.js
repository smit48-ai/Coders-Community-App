import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// boilerplate code for redux
//TODO: Thunk is just use to log the actions done and states changed and for action creaters
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { posts } from './Reducers/PostReducers';
import { User } from './Reducers/UserReducers';
// boilerplate code for redux

// store is object of reducers functions
const store=configureStore({reducer: {posts, User}},compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
       <Provider store={store}>
         <App />
       </Provider>
    </BrowserRouter>
);

