import React from 'react'
import UserList from './features/user/userList.jsx';
import UserForm from './features/user/userForm.jsx';
import Userdetails from './features/user/userdetails.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ThreeScene from './components/ThreeScene.jsx';
import AnimatedCursor from './components/AnimatedCursor.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <AnimatedCursor />
    <ThreeScene />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/create' element={<UserForm />} />
          <Route path='/edit/:id' element={<UserForm />} />
          <Route path='/details/:id' element={<Userdetails />} />
          <Route path='/three' element={<ThreeScene />} /> {/* Three.js route */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
