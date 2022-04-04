import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* <Route index element={<Home />} />
         */}
      </Route>
    </Routes>
  );
}

export default App;
