import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';



const Login = ({showWelcomeHandler}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const loginHandler = async(e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/vendor/login`,{
      method:'POST',
      // credentials: 'include',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email, password})
    });
  
    const data = await response.json();

    if(response.ok){

      alert('Login SUCCESS!!');
      setEmail("");
      setPassword("");
      localStorage.setItem('loginToken', data.token);
      showWelcomeHandler();

    }

    const vendorId = data.vendorId; 
    console.log("Checking for VendorId: " , vendorId);

    const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
    const vendorData = await vendorResponse.json();
    if(vendorResponse.ok){
      const vendorFirmId = vendorData.vendorFirmId;
      console.log("Checking for FirmId: ",vendorFirmId);
      localStorage.setItem('firmId', vendorFirmId);
      // const vendorFirmName = vendorData.vendor.firm[0].firmName;
      // console.log("My firmName is ", vendorFirmName);
      // localStorage.setItem('firmName', vendorFirmName);
      window.location.reload();
    }

  } catch (error) {
    console.error(error);
    alert("Login Failed----");
    
  }

}

  return (
    <div className="LoginSection">
        <h2>VENDOR LOGIN</h2>
        <form className='authForm' onSubmit={loginHandler}>
            <label>E-mail</label>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc@exampl.com'/><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='********'/><br />
            <div className="btnSubmit" >
                <button type="submit">Login</button>
                {/* <p>Don't have an account?<br /> <a href="#">Sign up</a></p> */}
            </div>
            </form>
    </div>
  )
}

export default Login
