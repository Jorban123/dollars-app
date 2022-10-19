import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header'
import Window from './components/window/Window';
const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>

        <Routes>
          <Route path="/" element={<Window title='Конвертер валют' />} />
        </Routes>
    </div>
  );
}

export default App;
