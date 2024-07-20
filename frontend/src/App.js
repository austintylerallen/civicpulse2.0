import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventForm from './pages/EventForm';
import EventDetails from './pages/EventDetails';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    } />
                    <Route path="/create-event" element={
                        <PrivateRoute>
                            <EventForm />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-event/:id" element={
                        <PrivateRoute>
                            <EventForm />
                        </PrivateRoute>
                    } />
                    <Route path="/event/:id" element={
                        <PrivateRoute>
                            <EventDetails />
                        </PrivateRoute>
                    } />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
