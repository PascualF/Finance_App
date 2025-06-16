import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Layout from './components/Layout'
import './App.css'
import { useAuth } from './useAuth'
import ContentArea from './components/ContentArea'

function ProtectedRoute({ children }: { children: React.ReactNode }){
  const {user, isLoading} = useAuth()

  // This is needed because the user is initially checked as null.
  // The loading let the authprovider time to check the user and pass it to here.
  if (isLoading) return <div>Loading...</div>
  
  return user ? children : <Navigate to='/login' replace />
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected layout + children, everyone is protected */}
        <Route path='/' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        } >
        {/* Nested pages inside layout's Content Area */}
        <Route index element={<ContentArea />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App