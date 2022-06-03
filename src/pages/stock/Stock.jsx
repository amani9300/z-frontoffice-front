import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Accueil() {
  const [listProduit, setlistProduit] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);
    axios
      .get("/api/produit")
      .then((res) => setlistProduit(res.data))
      .catch((err) => console.log(err.response))
      .finally(() => setloading(false));
  }, []);

  const style = {
    img: {
      width: "300px",
      height: "300px",
    },
  };

  const affichageListe = listProduit.map((produit) => (
    <div key={produit._id}>
      <img src={produit.photoProduit} alt="" style={style.img} />
      <h1> {produit.nom} </h1>
      <p> {produit.prix} € </p>
      <p> Quantité disponible: {produit.qteDispo} </p>
      <p> {produit.description} </p>
      <button onClick={() => navigate(`/produit/${produit._id}`)}>
        Ajouter au panier
      </button>
    </div>
  ));

  return (
    <div>
      <h1>Stock</h1>
      {loading && <Spinner />}
      {affichageListe}
    </div>
  );
}
