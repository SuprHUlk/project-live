import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import "./index.css";

import Dashboard from './components/Dashboard';
import Loading from './components/Loading';
import PrivateRoutes from './resources/PrivateRoutes';

const Main: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loading" element={<Loading />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
