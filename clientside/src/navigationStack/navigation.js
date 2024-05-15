import { Route, Routes } from "react-router-dom"
import NavBar from "../components/navbar/navbar";
import Products from "../components/product/product";
import AuthForm from "../components/loginRegister/register";
import { createContext, useState } from "react";
import ProductDetailsPage from "../components/product/oneProduct";
import Order from "../components/orders/orders";
import CartDetails from "../components/card/cartItems";
import ProfilePage from "../components/loginRegister/profile";

export const searchQueryContext=createContext()


const Navigation=()=>{
  const [searchQuery, setSearchQuery] = useState('');

  const [login, setLogin] = useState(() => {
    // Initialize login state from localStorage or default to false
    return localStorage.getItem('login') === 'true';
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogin = () => {
    const newLoginState = !login;
    setLogin(newLoginState);
    // Store login state in localStorage
    localStorage.setItem('login', newLoginState);
  };


    return(
        <>
        <searchQueryContext.Provider value={{ searchQuery,login, handleLogin}}>
        <NavBar onSearch={handleSearch} />
          
                <Routes>

                    <Route path="/" element={<Products />} />
                    {login ? <Route path="/profile" element={<ProfilePage/>} />:<Route path="/signIn" element={<AuthForm />} />}
                    {/* <Route path="/signIn" element={<AuthForm />} />
                    // <Route path="/profile" element={<ProfilePage/>} /> */}
                    <Route path="/cartItems" element={<CartDetails/>} />
                    <Route path="/product/:id" element={<ProductDetailsPage/>} />
                     <Route path="/orders"  element={<Order/>} />
                </Routes>
           
        </searchQueryContext.Provider>
        </>
    )
}

export default Navigation;