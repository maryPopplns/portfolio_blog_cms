import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Homepage from '../components/homepage/Homepage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
