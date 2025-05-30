import React, {useState, useSyncExternalStore} from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {

  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);


  const handleImageUpload =(event) =>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }
  const handleCategoryChange = (event)=>{

    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item) => item!==value));
      }else{
        setCategory([...category, value]);
      }

  }

  
  const handleRegionChange = (event)=>{

    const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item) => item!==value));
      }else{
        setRegion([...region, value]);
      }

  }

  const handleFirmSubmit = async(e) => {
    e.preventDefault();
    try {
      
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.log("User not Authenticated");
      }

      const formData = new FormData();
        formData.append('firmName',firmName);
        formData.append('area',area);
        formData.append('offer',offer);
        formData.append('image',file);

        category.forEach((value) => {
          formData.append('category',value);
        });
        region.forEach((value) => {
          formData.append('region', value);
          
        });

        const response = await fetch(`${API_URL}/firm/add-firm`,{
          method:'POST',
          headers:{
            'token': `${loginToken}`
          },
          body: formData
        });

        const data = await response.json();
        if(response.ok){
          console.log(data);
          alert("FIRM Added SUCCESSFULLY!!");
          setFirmName("");
          setArea("");
          setOffer("");
          setCategory([]);
          setRegion([]);
          setFile(null);
        } else if(data.message === "Vendor can have only one firm"){
          alert("Firm Exists. Only TWO Firm's can be Added");
        } else{
          alert("Failed to Add Firm");
        }

        console.log("this is FirmId",data.firmId);

        const firmId =  data.firmId;

        localStorage.setItem('firmId',firmId);


    } catch (error) {

      console.error("FAILED to Add FIRM-----");
      alert("FAILED to Add FIRM-----");

    }


  }
  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>ADD FIRM</h2>
        <label>Firm Name: </label>
        {/* <input type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} /> */}

            <input type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)}/>
            <label>Area: </label>
            <input type="text" name='area'value={area} onChange={(e) => setArea(e.target.value)}/>
            <div className="checkInp">
              <label> Category:</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg"  checked={category.includes('veg')} onChange={handleCategoryChange} />
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>          
          
            <div className="checkInp">
              <label> Region:</label>
              <div className="regContainer">
              <div className="regboxContainer">
                <label>South Indian</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
              </div>
              <div className="regboxContainer">
                <label>North Indian</label>
                <input type="checkbox" value="north-indian"  checked={region.includes('north-indian')} onChange={handleRegionChange}/>
              </div>
              <div className="regboxContainer">
                <label>Chinese</label>
                <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
              </div>
              <div className="regboxContainer">
                <label>Bakery</label>
                <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
              </div>
              </div>
            </div>   
            <label>Offer: </label>
            <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)}/>
            <label>Firm Image: </label>
            <input type="file"  onChange={handleImageUpload}/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>

    </div>
  )
}

export default AddFirm
