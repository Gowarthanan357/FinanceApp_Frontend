
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/form';
import UpdateCandidate from './components/updateCandidate';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Form/>}></Route>
      <Route path='/update/:userId' element={<UpdateCandidate/>}></Route>
    </Routes>
  );
}

export default App;
