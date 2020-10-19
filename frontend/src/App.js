import React, { Fragment } from 'react';
import './App.css';
import { Lading } from './components/layouts/Lading';
import { Navbar } from './components/layouts/Navbar';

const App = () => (
  <Fragment>
    <Navbar />
    <Lading />
  </Fragment>
);

export default App;
