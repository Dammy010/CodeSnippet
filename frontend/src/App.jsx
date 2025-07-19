import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Snippets from './pages/Snippets';
import AddSnippet from './pages/AddSnippet';
import EditSnippet from './pages/EditSnippet';
import SnippetDetail from './pages/SnippetDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
// ...


export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen px-4 py-6">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/snippets' element={<Snippets />} />
          <Route path='/add-snippet' element={<PrivateRoute><AddSnippet /></PrivateRoute>} />
          <Route path='/edit-snippet/:id' element={<PrivateRoute><EditSnippet /></PrivateRoute>} />
          <Route path='/snippets/:id' element={<SnippetDetail />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}