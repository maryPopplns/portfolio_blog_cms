import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        {/* <Route index element={<Home />} />         */}
      </Route>
    </Routes>
  );
}

export default App;
