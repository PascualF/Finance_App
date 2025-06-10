import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MainPage from './components/MainPage'
import './App.css'

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainPage />} />
        
      </Routes>
    </Router>
  )
}

export default App


