import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskMangementApp from './Componets/TaskMangementApp';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<TaskMangementApp/>} />
      <Route path= '/taskdashbaord' element= {< TaskMangementApp/>} />
      </Routes>
    </Router>
  );
}

export default App;
