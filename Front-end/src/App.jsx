import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AddRecipe from './components/AddRecipe';
import Favorite from './components/Favorite';
import Profile from './components/Profile';
import YourRecipe from './components/YourRecipe';
import Browse from './components/Browse';
import RecipeDetail from './components/RecipeDetail';
import AboutUs from './components/AboutUs';
import AdminLogin from './components/Admin/AdminLogin'; 
import AdminDashboard from './components/Admin/AdminDashboard'; 
import ManageUser from './components/Admin/ManageUser';
import ManageRecipe from './components/Admin/ManageRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import Grocery from './components/Grocery';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />} 
      <Routes>
        
        <Route path='/admin/adminlogin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<ManageUser />} />
        <Route path='/admin/recipes' element={<ManageRecipe />} />

        <Route path='/' element={<Browse />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/add' element={<AddRecipe />} />

        <Route path='/user/:id' element={<YourRecipe />} /> 
        <Route path='/grocery' element={<Grocery />} /> 
        <Route path='/favorites/:id' element={<Favorite />} /> 
        <Route path='update' element={<UpdateRecipe />} />        
        <Route path='/recipe/:id' element={<RecipeDetail />} /> 

       
      </Routes>
      {!isAdminRoute && <Footer />} 
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
