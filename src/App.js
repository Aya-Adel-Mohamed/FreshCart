import { useState,useEffect } from 'react';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import RestCode from './Components/ResetCode/ResetCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import './App.css';

function App() {
const [userData,setUserData] = useState(null);

function saveUserData (){
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);

  setUserData(decodedToken);

}

useEffect(()=>{
  if(localStorage.getItem("userToken")){
    saveUserData()
  }
},[]);

function ProtectedRoute(props){
  if(localStorage.getItem('userToken')){
    return props.children
  }else{
    return <Navigate to='/signin'/>
  }
}

function logOut(){
  localStorage.removeItem('userToken');
  setUserData(null);
  return <Navigate to='/signin'/>
}

  let routers = createBrowserRouter([
    {path:'/',element:<MainLayout userData={userData} logOut={logOut}/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'about',element:<ProtectedRoute><About/></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'signup',element:<SignUp/>},
      {path:'signin',element:<SignIn saveUserData={saveUserData}/>},
      {path:'forgetPassword',element:<ForgetPassword/>},
      {path:'resetCode',element:<RestCode/>},
      {path:'resetPassword',element:<ResetPassword/>},
      {path:'*',element:<NotFound/>},

    ]}
  ])
  return (
    <>
    <RouterProvider router={routers}/>
    </>
  );
}

export default App;
