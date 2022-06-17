import axios from "axios";
import React, { useEffect } from "react";

export default function ListProduit({
  listProduit,
  setlistProduit,
  setnom,
  setprix,
  setqteDispo,
  setidProduit,
  setdescription,
}) {
  // Récuperer la liste des produits de l'utilisateur connecté
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/api/produit/produitUser", config)
      .then((res) => setlistProduit(res.data))
      .catch((err) => console.log(err.response));
  }, [setlistProduit]);

  // Supprimer un produit
  const deleteProduit = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/produit/${id}`, config)
      .then((res) => {
        setlistProduit(listProduit.filter((produit) => produit._id !== id));
      })
      .catch((err) => console.log(err.response));
  };

  // Mettre à jours le formulaire
  const updateForm = (produit) => {
    setnom(produit.nom);
    setprix(produit.prix);
    setqteDispo(produit.qteDispo);
    setdescription(produit.description);
    setidProduit(produit._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <button onClick={() => deleteProduit(produit._id)}> delete </button>
      <button onClick={() => updateForm(produit)}> update </button>
    </div>
  ));

  return <div>{affichageListe}</div>;
}
