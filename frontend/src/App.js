import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Errors from './pages/errors';
import Login from './pages/login';
import Script from './pages/script';
import { ProtectedRoute } from './components/protectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Errors />
                    </ProtectedRoute>
                } />
                <Route path="/script" element={
                    <ProtectedRoute>
                        <Script />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
