
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import useAuthCheck from './hooks/useAuthCheck'
import Login from './pages/Login'
import  Projects  from './pages/Projects'
import Teams from './pages/Teams'

function App() {
  const authChecked = useAuthCheck()

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2 className='text-center py-4 text-3xl'>Not Founds 404</h2>}></Route>
      </Routes>
    </Router>
  )
}

export default App
