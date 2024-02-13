import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./index.css";

import Dashboard from './components/Dashboard';
import Loading from './components/Loading';
import PrivateRoutes from './shared/PrivateRoutes';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/loading" element={<Loading />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
