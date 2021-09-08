import React from 'react';
import './App.css';
import Description from './components/Description';
import FormBox from './components/FormBox';

const App: React.FC = () => {
  return (
    <div className="App">
      <Description />
      <FormBox />
    </div>
  );
}

export default App;
