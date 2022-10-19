import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header'
import Converter from './components/converter/Converter';
import Currency from './components/currency/Currency';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path="/" element={<Converter title='Конвертер валют' />} />
        <Route path="/currency" element={<Currency/>} />
      </Routes>
    </div>
  );
}

export default App;
