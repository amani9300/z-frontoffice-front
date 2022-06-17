import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

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
        <div>
          <img src={produit.photoProduit} alt="" style={style.img} />
          <h1> {produit.nom} </h1>
          <p> {produit.prix} € </p>
          <p> Quantité disponible: {produit.qteDispo} </p>
          <p> {produit.description} </p>

          
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
