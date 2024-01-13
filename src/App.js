import './App.css';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Products from './Components/Products/Products';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import MainLayout from './Components/MainLayout/MainLayout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {

  let routers = createBrowserRouter([
    {path:'/',element:<MainLayout/>,children:[
      {index:true,element:<Home/>},
      {path:'about',element:<About/>},
      {path:'products',element:<Products/>},
      {path:'cart',element:<Cart/>},
      {path:'categories',element:<Categories/>},
      {path:'brands',element:<Brands/>},
      {path:'signup',element:<SignUp/>},
      {path:'signin',element:<SignIn/>},
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
