import { useState } from 'react';
import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Description from './pages/Description';
import FeedbackButton from './components/FeedbackButton';

function App() {
  return (
    <>
    <AuthProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* ...existing routes... */}
            <Route path="/description/:id" element={<Description />} />
            {/* ...existing routes... */}
          </Routes>
          <Outlet />
        </main>
        <FeedbackButton />
        <Footer />
      </div>
    </AuthProvider>
    </>
  )
}

export default App
