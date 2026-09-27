import { Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogForm from './pages/BlogForm'
import BlogList from './pages/BlogList'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/blogs/new' element={
        <ProtectedRoute>
        <BlogForm/>
        </ProtectedRoute>
        }/>
      <Route path='/blogs/edit/:id' element={
        <ProtectedRoute>
          <BlogForm/>
        </ProtectedRoute>
        }/>
      <Route path='/blogs' element={
        <ProtectedRoute>
          <BlogList/>
        </ProtectedRoute>
        }/>

        <Route path='*' element={<Navigate to="/blogs" replace/>}/>
     </Routes>
  )
}

export default App
