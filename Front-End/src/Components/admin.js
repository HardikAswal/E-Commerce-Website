import React from "react";
import {BrowserRouter as Route,Link} from "react-router-dom";
import "../App.css";

function Admin(props){

    const [productName, setproductName] = React.useState("");
    const [productDesc, setproductDesc] = React.useState("");
    const [productPrice, setproductPrice] = React.useState("");
    let [productPicture, setproductPicture] = React.useState({file:null});
    const [qtyS,setqtyS]= React.useState("");
    const [qtyM,setqtyM]= React.useState("");
    const [qtyL,setqtyL]= React.useState("");
    const [qtyXL,setqtyXL]= React.useState("");
    const [style,setstyle]= React.useState("");
    const [neck,setneck]= React.useState("");
    const [sleeve,setsleeve]= React.useState("");
    const [men,setMen]= React.useState(false);
    const [women,setWomen]= React.useState(false);
    const [kids,setKids]= React.useState(false);

    const [showMe, setShowMe] = React.useState([]);
    const [updateName, setupdateName] = React.useState("");
    const [updateDesc, setupdateDesc] = React.useState("");
    const [updatePrice, setupdatePrice] = React.useState("");
    const [updatePicture, setupdatePicture] = React.useState({file:null,inputKey:Date.now()});
    const [updateQtyS, setupdateQtyS] = React.useState("");
    const [updateQtyM, setupdateQtyM] = React.useState("");
    const [updateQtyL, setupdateQtyL] = React.useState("");
    const [updateQtyXL, setupdateQtyXL] = React.useState("");
    const [updateStyle, setupdateStyle] = React.useState("");
    const [updateNeck, setupdateNeck] = React.useState("");
    const [updateSleeve, setupdateSleeve] = React.useState("");
    const [updateMen, setupdateMen] = React.useState("");
    const [updateWomen, setupdateWomen] = React.useState("");
    const [updateKids, setupdateKids] = React.useState("");

    const setImage = (e) => {
        //console.log(e.target.files[0].name);
        let file = e.target.files[0];  //Capture the file in variable otherwise event gets nullified and you won't get file.
        console.log(file);
        console.log(URL.createObjectURL(file))
        setproductPicture(prevState=>({
           ...prevState,
        //    file:URL.createObjectURL(file)
        file:file
        }))
      }

    const setUpdateImage = (e) => {
        // console.log(e.target.files[0].name);
        let file = e.target.files[0];  //Capture the file in variable otherwise event gets nullified and you won't get file.
        // console.log(file);
        setupdatePicture(prevState=>({
           ...prevState,
           file: URL.createObjectURL(file)
        }))
      } 

    const isShown = el => showMe.includes(el.id);

    const toggleShown = el => {
        setShowMe(shown => {
          if (shown.includes(el.id)) {
            return shown.filter(id => id !== el.id);
          }
          return [...shown, el.id];
        });
      };

    return (
        <div id="admin-container">
            <div id="product-info"> 
            <input type="file" required onChange={setImage} key={productPicture.inputKey}/><br/>
            <input type="text" required placeholder="Product Name" onChange={(e)=>{setproductName(e.target.value)}} value={productName}/><br/>
            <input type="number" required placeholder="Product Price" onChange={(e)=>setproductPrice(e.target.value)} value={productPrice}/><br/>
            <input type="text" placeholder="Product Description" onChange={(e)=>setproductDesc(e.target.value)} value={productDesc}></input><br/>
            <input type="number" required placeholder="Quantity S" onChange={(e)=>setqtyS(e.target.value)} value={qtyS}/>
            <input type="number" required placeholder="Quantity M" onChange={(e)=>setqtyM(e.target.value)} value={qtyM}/><br/>
            <input type="number" required placeholder="Quantity L" onChange={(e)=>setqtyL(e.target.value)} value={qtyL}/>
            <input type="number" required placeholder="Quantity XL" onChange={(e)=>setqtyXL(e.target.value)} value={qtyXL}/><br/>
            
            <select onChange={(e)=>setneck(e.target.value)} value={neck} >
                <option>Select Neck</option>
                <option value="Round Neck" name="Round Neck">Round Neck</option>
                <option value="V Neck" name="V Neck">V Neck</option>
                <option value="Polo" name="Polo">Polo</option>
            </select>
            <br/>
            <select onChange={(e)=>setsleeve(e.target.value)} value={sleeve} >
                <option>Select Sleeve</option>
                <option value="Half Sleeve" name="Half Sleeve">Half Sleeve</option>
                <option value="Full Sleeve" name="Full Sleeve">Full Sleeve</option>
            </select>
            <br/>
            <select onChange={(e)=>setstyle(e.target.value)} value={style}>
                <option>Select Style</option>
                <option value="Solid">Solid</option>
                <option value="Checked">Checked</option>
                <option value="Printed">Printed</option>
            </select><br/>
            <input type="checkbox" name="Men" value="Men" checked={men} onChange={(e)=>setMen(e.target.checked)}/>Men
            <input type="checkbox" name="Women" value="Women" checked={women} onChange={(e)=>setWomen(e.target.checked)}/>Women
            <input type="checkbox" name="Kids" value="Kids" checked={kids }onChange={(e)=>setKids(e.target.checked)}/>Kids
            <br/>
            <button type="Submit" onClick={(e)=>{props.AddInfo({productName,productPicture,productPrice,productDesc,qtyS,qtyM,qtyL,qtyXL,style,neck,sleeve,men,women,kids});setproductName("");setproductPicture({file:null});setproductPrice("");setproductDesc("");setqtyS("");setqtyM("");setqtyL("");setqtyXL("");setstyle("");setneck("");setsleeve("");setMen(false);setWomen(false);setKids(false)}}>Add</button>
            <br/><br/>
            </div>

            <div className="adminProducts">
                {props.admin.map((x,i)=>(
            <div className="admin-list">
                <div className="admin-product-image">
                 {console.log("Admin side received product details: ",x)}   
                {/*typeof x.picture.file  === 'string' ? */<img src={"/images/"+x.picture.file.filename} alt="Product" style={{width:"250px",height:"auto"}}></img>/*:""*/}
                </div>
                <br/>

                {isShown(x) ? 
                    <div>
                        <input type="file" onChange={setUpdateImage} key={productPicture.inputKey}/><br/>
                        <input type="text" placeholder="Product Name" onChange={(e)=>setupdateName(e.target.value)} value={updateName}/><br/>
                        <input type="number" placeholder="Product Price" onChange={(e)=>setupdatePrice(e.target.value)} value={updatePrice}/><br/>
                        <input type="text" placeholder="Product Description" onChange={(e)=>setupdateDesc(e.target.value)} value={updateDesc}></input>
                        <input type="number" placeholder="Quantity S" onChange={(e)=>setupdateQtyS(e.target.value)} value={updateQtyS}/><br/>
                        <input type="number" placeholder="Quantity M" onChange={(e)=>setupdateQtyM(e.target.value)} value={updateQtyM}/><br/>
                        <input type="number" placeholder="Quantity L" onChange={(e)=>setupdateQtyL(e.target.value)} value={updateQtyL}/><br/>
                        <input type="number" placeholder="Quantity XL" onChange={(e)=>setupdateQtyXL(e.target.value)} value={updateQtyXL}/><br/>
                    Neck Type <select onChange={(e)=>setupdateNeck(e.target.value)} value={updateNeck} >
                        <option>Select</option>
                        <option value="Round Neck" name="Round Neck">Round Neck</option>
                        <option value="V Neck" name="V Neck">V Neck</option>
                        <option value="Polo" name="Polo">Polo</option>
                    </select>
                    <br/>
                    Sleeve <select onChange={(e)=>setupdateSleeve(e.target.value)} value={updateSleeve} >
                        <option>Select</option>
                        <option value="Half Sleeve" name="Half Sleeve">Half Sleeve</option>
                        <option value="Full Sleeve" name="Full Sleeve">Full Sleeve</option>
                    </select>
                    <br/>
                    Style <select onChange={(e)=>setupdateStyle(e.target.value)} value={updateStyle}>
                        <option>Select</option>
                        <option value="Solid">Solid</option>
                        <option value="Checked">Checked</option>
                        <option value="Printed">Printed</option>
                    </select>
                    <br/>
                    Men <select onChange={(e)=>setupdateMen(e.target.value)} value={updateMen}>
                        <option /*value={null}*/>Select</option>
                        <option value="True" >True</option>
                        <option value="False">False</option>
                    </select>
                    <br/>
                    Women <select onChange={(e)=>setupdateWomen(e.target.value)} value={updateWomen}>
                        <option /*value={null}*/>Select</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                    <br/>
                    Kids <select onChange={(e)=>setupdateKids(e.target.value)} value={updateKids}>
                        <option /*value={null}*/>Select</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
            <br/>
                <button type="submit" onClick={(e)=>{props.UpdateInfo({updateName,updateDesc,updatePrice,updatePicture,updateQtyS,updateQtyM,updateQtyL,updateQtyXL,updateStyle,updateNeck,updateSleeve,updateMen,updateWomen,updateKids},{x},i);setupdateName("");setupdateDesc("");setupdatePrice("");setupdatePicture({file:null,inputKey:Date.now()});setupdateQtyS("");setupdateQtyM("");setupdateQtyL("");setupdateQtyXL("");setupdateStyle("");setupdateNeck("");setupdateSleeve("");setupdateMen("");setupdateWomen("");setupdateKids("")}}>Save</button>
            </div>:null}
             <div className="admin-product-info">
             <b><h5>{x.name}</h5></b>
             <br/>
             <div className="admin-product-desc ">{x.description}</div>
             <br/>
             <b>Rs.{x.price}</b>
             </div>
             <div className="admin-list-btn">
                <button onClick={e => toggleShown(x)}>{isShown(x) ? "Close":"Update"}</button>
                <button onClick={(e)=>{props.removeProduct({x})}}>Remove</button>
            </div>
            </div>))}
            </div>
            </div>
    )
}

export default Admin;