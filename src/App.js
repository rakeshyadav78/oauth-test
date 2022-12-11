
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import AuthProvider from './component/AuthProvider';
import Contact from './component/Contact';
import Home from './component/Home';
import Login from './component/Login';
import NavBar from './component/navs/NavBar';
import NotFound from './component/NotFound';
import Profile from './component/Profile';
import ProtectedRoute from './component/ProtectedRoute';


function App() {
  return (

    <div className="app">
      <AuthProvider>

        <header id='appHeader'>
          <NavBar />
        </header>


        <Routes>
          <Route index element={<Home></Home>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/about' element={<About></About>} />
          <Route path='/contact' element={<Contact></Contact>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/profile' element={<ProtectedRoute><Profile></Profile></ProtectedRoute>} />
          <Route path='*' element={<NotFound></NotFound>} />
        </Routes>

        <footer id='appFooter'>
          <h1>Footer</h1>
        </footer>
      </AuthProvider>
    </div>


  );
}

export default App;
