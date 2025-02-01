import { createRoot } from 'react-dom/client'
import Login from './components/Login'
import Registration from './components/Registration'
import Packages from './components/Packages'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/registration" element={<Registration />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/" element={<Navigate to="/packages" />} />
    </Routes>
  </Router>
)
