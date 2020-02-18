import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
// Import All Component;
import ExerciseList from './components/ExerciseList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/index'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar  />
          <div className="container">
            <Route path="/" exact component={ExerciseList} />
            <Route path="/edit/:id" exact component={EditExercise} />
            <Route path="/create" exact component={CreateExercise} />
            <Route path="/user" exact component={CreateUser} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
