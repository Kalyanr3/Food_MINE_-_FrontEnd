import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");



  const handleImageUpload =(event) =>{
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }


  const handleCategoryChange = (event)=>{

    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item) => item!==value));
      }else{
        setCategory([...category, value]);
      }

  }


  const handleBestSeller = (event) => {

    const value = event.target.value;
    // setBestSeller(value);
    setBestSeller(JSON.parse(value));
  }
  
  


  const handleAddProduct = async(e) => {

    e.preventDefault();


    try {
      
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.error("User not Authenticated---");
        alert("User not Authenticated---");
        return;
      }

      const formData = new FormData();
              formData.append('productName',productName);
              formData.append('price',price);
              formData.append('description',description);
              formData.append('image', image);
      
              category.forEach((value) => {
                formData.append('category',value);
              });
             
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
                method:'POST',
                // headers:{
                //   'token': `${loginToken}`
                // },
                body: formData
              });
      
              const data = await response.json();
              if(response.ok){
                console.log(data);
                alert("PRODUCT Added SUCCESSFULLY!!");
                setProductName("");
                setPrice("");
                setDescription("");
                setCategory([]);
                setBestSeller(null);
                setImage(null);
              }

              
    } catch (error) {
      
      const data = await response.json();

    // console.error("Error adding product:", error.message);
    // alert('Failed to ADD PRODUCT----');

     
  // // console.error("Unexpected error:", error);
  // // alert("Failed to ADD PRODUCT ----");
  //     // console.error(error);
      console.error(data.message);
      alert('Failed to ADD PRODUCT----');
  // // // console.error("Error adding product:");  // ✅ Correct way
  // // // alert('Failed to ADD PRODUCT----');

    }

  }


  return (
    <div className="firmSection">
       <form className="productForm" onSubmit={handleAddProduct}>
        <h2>ADD PRODUCTS </h2>
        <label>Product Name: </label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <label>Price: </label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <div className="checkInp1">
              <label> Category:</label>
              <div className="inputsContainer1">
              <div className="checkboxContainer1">
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')}  onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer1">
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')}  onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>
            <div className="checkInp1">
              <label> Best Seller:</label>
              <div className="inputsContainer1">
              <div className="checkboxContainer1">
                <label>Yes</label>
                <input type="radio" value="true" checked = {bestSeller=== true} onChange={handleBestSeller} />
              </div>
              <div className="checkboxContainer1">
                <label>No</label>
                <input type="radio" value="false" checked = {bestSeller=== false} onChange={handleBestSeller} />
              </div>
              </div>
            </div>
            <label>Description: </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            {/* <label>Offer: </label>
            <input type="text" value={productName} onChange={(e) => set(e.target.value)}/> */}
            <label>Firm Image: </label>
            <input type="file" onChange={handleImageUpload} />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
