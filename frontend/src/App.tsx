import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MainPage from './components/MainPage'
import './App.css'
import { useAuth } from './useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }){
  const {user} = useAuth()
  return user ? children : <Navigate to='/login' replace />
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/' element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } /> 
      </Routes>
    </Router>
  )
}

export default App