import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import List from './components/List';
import View from './components/View';
import Update from './components/Update';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/form' element={<Form/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/view' element={<View/>} />
          <Route path='/update/:student_id' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
