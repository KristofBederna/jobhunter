import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css'
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ManageJob from './pages/ManageJob';
import JobList from "./components/MainPage/JobList";
import JobDetail from './components/JobListing/JobDetail';

function App() {
  const user = useSelector((state) => state.user); // Access user data from Redux store

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          {!user.id ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : null}
          {user.id ? ( // Check if user is logged in
            <>
              <Route path="/profile" element={<Profile />} />
              {user.role === 'company' && <Route path='/manageJob' element={<ManageJob />} />}
            </>
          ) : (
            <>
              <Route path="/profile" element={<Navigate to="/login" />} />
              <Route path='/manageJob' element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
