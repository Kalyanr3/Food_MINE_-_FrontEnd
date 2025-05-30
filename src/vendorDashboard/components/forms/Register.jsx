import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username, email, password})
      });

      const data = await response.json();

      if(response.ok){
        // const data = await response.json();
        console.log(data);
        setUsername("");
        setEmail("");
        setpassword("");
        alert("Vendor Registeration SUCCESS!!");
        showLoginHandler()

      }//  else {
      // //   const errorData = await response.json(); // Try parsing error response
      // //   alert(`Registration Failed: ${errorData.message || "Unknown error"}`);
      // // }
    } catch (error) {
      console.error("Registartion Failed");
      alert("Registartion Failed");
    //   alert(`Registration Failed: ${data?.error || "Unknown error"}`);
     }
}


  return (
    <div className="registerSection">
        <h2>VENDOR REGISTRATION </h2>
        <form className='authForm' onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter your Name '/><br />
            <label>E-mail</label>
            <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='abc@exampl.com'/><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=> setpassword(e.target.value)} placeholder='********'/><br />
            <div className="btnSubmit">
                <button type='submit'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register
