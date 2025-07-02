import React from 'react'
import UserList from './features/user/userList.jsx';
// import UserCreate from './features/user/userForm.jsx';
import UserForm from './features/user/userForm.jsx';
import Userdetails from './features/user/userdetails.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<UserList />}></Route>
          <Route path='/create' element={<UserForm />} />
          <Route path='/edit/:id' element={<UserForm />} />
          <Route path='/details/:id' element={<Userdetails />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App