import { useState,useEffect } from 'react';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './apis/query.clint.js';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
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
import ProductsOfCategories from './Components/ProductsOfCategories/ProductsOfCategories.jsx';
import ProductBrands from './Components/ProductBrands/ProductBrands.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import Orders from './Components/Orders/Orders.jsx';
import CashCheckout from './Components/CashCheckout/CashCheckout.jsx';
import Profile from './Components/Profile/Profile.jsx';
import './App.css';

function App() {
const [userData,setUserData] = useState(null);
function saveUserData (){
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  setUserData(decodedToken);
}
console.log(userData);
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
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'cash',element:<ProtectedRoute><CashCheckout/></ProtectedRoute>},
      {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'categories/productcategories/:slug',element:<ProtectedRoute><ProductsOfCategories/></ProtectedRoute>},
      {path:'brands/productbrands/:brandSlug',element:<ProtectedRoute><ProductBrands/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders userData={userData}/></ProtectedRoute>},
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
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={routers} />
      <Toaster position="bottom-left" reverseOrder={false}/>
    </QueryClientProvider>
    </>
  );
}

export default App;
