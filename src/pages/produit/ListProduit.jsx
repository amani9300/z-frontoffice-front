import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ListProduit({

  listProduit,
  setlistProduit,
  setnom,
  setprix,
  setqteDispo,
  setidProduit,
  setdescription,
}
) {
  // Récuperer la liste des produits de l'utilisateur connecté
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/json/products.json", config)
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
              <button className="btn btn-primary" onClick={() => deleteProduit(produit._id)}> delete </button>
              <button className="btn btn-primary" onClick={() => updateForm(produit)}> update </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div>{affichageListe}</div>;
}
