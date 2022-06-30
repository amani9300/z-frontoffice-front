import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

export default function ListProduit({

  
  setnom,
  setprix,
  setqteDispo,
  setidProduit,
  setdescription,
}) {

  const [listProduit, setlistProduit]= useState([])
  // Récuperer la liste des produits de l'utilisateur connecté
  useEffect(() => {
    console.log('listProduit')
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

  // const style = {
  //   img: {
  //     width: "300px",
  //     height: "300px",
  //   },
  // };

  const affichageListe = listProduit.map((produit) => (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{produit.nom}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Prix:{produit.prix}</h6>
        <p className="card-text">{produit.description}</p>
        <img
          className="card-img-top"
          src={produit.photoProduit}
          alt="produit"
        />
        <Link to={`/produit/${produit.id}`} key={produit.id}>
          {produit.nom}
        </Link>

        <button
          className="btn btn-primary"
          onClick={() => deleteProduit(produit._id)}
        >
          {" "}
          delete{" "}
        </button>
        <button className="btn btn-primary" onClick={() => updateForm(produit)}>
          {" "}
          update{" "}
        </button>
      </div>
    </div>
  ));

 
  return <div className="container">
  {affichageListe}</div>;
}
