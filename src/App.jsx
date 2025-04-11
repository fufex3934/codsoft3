
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import PostForm from './components/PostForm'
import Post from './components/Post'

function App() {
  

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<BlogList/>}/>
        <Route path='/create' element={<PostForm/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
