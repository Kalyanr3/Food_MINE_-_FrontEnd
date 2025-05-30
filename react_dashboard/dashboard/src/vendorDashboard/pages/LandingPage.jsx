import React, { useState, useEffect, use} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/forms/AllProducts'

const LandingPage = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setsShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);
  

  useEffect(()=>{

    const loginToken = localStorage.getItem('loginToken');

    if(loginToken){

      setShowLogOut(true);
    }

  }, [])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  }, [])

  const logOutHandler = () => {
    confirm("Are you Sure For Logging OUT???");
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogOut(false);
    setShowFirmTitle(true);

  }

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setsShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setsShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setsShowFirm(true)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert("Please LOG-IN ");
    setShowLogin(true)
    // setShowRegister(false)
    // setsShowFirm(false)
    // setShowProduct(false)
    // setShowWelcome(false)
    // setShowAllProducts(false)
  }
}

  const showProductHandler = () => {
    if(showLogOut){
    setShowLogin(false)
    setShowRegister(false)
    setsShowFirm(false)
    setShowProduct(true)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert("Please LOG-IN");
    setShowLogin(true)
    // setShowRegister(false)
    // setsShowFirm(false)
    // setShowProduct(false)
    // setShowWelcome(false)
    // setShowAllProducts(false)
  }
}
  const showWelcomeHandler = () => {
    if(showLogOut){
    setShowLogin(false)
    setShowRegister(false)
    setsShowFirm(false)
    setShowProduct(false)
    setShowWelcome(true)
    setShowAllProducts(false)
  }else{
    alert("Please LOG-IN");
    setShowLogin(true)
    // setShowRegister(false)
    // setsShowFirm(false)
    // setShowProduct(false)
    // setShowWelcome(false)
    // setShowAllProducts(false)
  }
}
  const showAllProductsHandler = () => {
    if(showLogOut){ 
    setShowLogin(false)
    setShowRegister(false)
    setsShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
  }else{
    alert("Please LOG-IN");
    setShowLogin(true)
    // setShowRegister(false)
    // setsShowFirm(false)
    // setShowProduct(false)
    // setShowWelcome(false)
    // setShowAllProducts(false)
  }
}

  return (
    <>
        <section className = 'landingSection'>
            <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler} />
            <div className="collectionSection">
            <SideBar showFirmHandler = {showFirmHandler} showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>

            {showLogin && <Login showWelcomeHandler = {showWelcomeHandler} /> }
            {showRegister && <Register showLoginHandler ={showLoginHandler} />}
            {showFirm && showLogOut && <AddFirm />} 
            {showProduct && showLogOut && <AddProduct />} 
            {showWelcome && showLogOut && <Welcome />}
            {showAllProducts && <AllProducts />}
            

            </div>
            

        </section>
      
    </>
  )
}

export default LandingPage;
