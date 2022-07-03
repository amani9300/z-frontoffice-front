import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function DetailAnnonce() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [produit, setproduit] = useState("");
  
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get(`/api/produit/${id}`)
      .then((res) => setproduit(res.data))
      .catch((err) => console.log(err.response))
      .finally(() => setloading(false));
  }, [id]);

 
  const style = {
    img: {
      width: "300px",
      height: "300px",
    },
  };

  return (
    <div>
      DetailAnnonce
      {loading && <Spinner />}
      {produit && (
         <div className="container">
         <div className="row g-3">
           <div className="col-12 col-md-6 col-lg-4">
             <div className="card"></div>
             <div key={produit._id}>
               <img className="card-img-top" src={produit.photoProduit} alt="" style={style.img} />
               <div className="card-body">
                 <h5 className="card-title"> {produit.nom} </h5>
                 <p className="card-text"> {produit.prix} € </p>
                 <p className="card-text"> Quantité disponible: {produit.qteDispo} </p>
                 <p className="card-text"> {produit.description} </p>
                 {/* <button className="btn btn-primary" onClick={() => deleteProduit(produit._id)}> delete </button>
                 <button className="btn btn-primary" onClick={() => updateForm(produit)}> update </button> */}
               </div>
             </div>
           </div>
         </div>
       </div>
      )}
    </div>
  );
}
