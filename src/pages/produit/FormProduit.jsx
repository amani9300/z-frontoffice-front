import axios from "axios";
import React from "react";
import { Button } from 'react-bootstrap';
export default function FormProduit({
  listProduit,
  setlistProduit,
  nom,
  setnom,
  prix,
  setprix,
  qteDispo,
  setqteDispo,
  description,
  setdescription,
  file,
  setfile,
  idProduit,
  setidProduit,
}) {
  // Crée un produit
  const createProduit = () => {
    let formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("qteDispo", qteDispo);
    formData.append("description", description);
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("/api/produit", formData, config)
      .then((res) => {
        setlistProduit((listProduit) => [res.data, ...listProduit]);
        setnom("");
        setprix("");
        setdescription("");
        setqteDispo("");
        setfile("");
      })
      .catch((err) => console.log(err.response));
  };

  // Mettre à jours un produit
  const updateProduit = () => {
    let formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("qteDispo", qteDispo);
    formData.append("description", description);
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .put(`/api/produit/${idProduit}`, formData, config)
      .then((res) => {
        const tmp = listProduit.filter((produit) => produit._id !== idProduit);
        setlistProduit([res.data, ...tmp]);
        setnom("");
        setprix("");
        setdescription("");
        setqteDispo("");
        setfile("");
        setidProduit("");
      })
      .catch((err) => console.log(err));
  };

  return (
      
       <div className="Auth-form-content">
      <h3 className="Auth-form-title">Créer un produit</h3>

      
    
      <div className="form-group mt-3">
      
        <input
          type="text"
          placeholder="Entrez le nom du produit"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        
        <div className="form-group mt-3">
        <input
          type="text"
          placeholder="Entrez le prix du produit"
          value={prix}
          onChange={(e) => setprix(e.target.value)}
        />
        
        <div className="form-group mt-3">
        <input
          type="text"
          placeholder="Entrer la quantité disponible"
          value={qteDispo}
          onChange={(e) => setqteDispo(e.target.value)}
        />
       
        <div className="form-group mt-3">
          <input
          type="text"
          placeholder="Saisir une description pour le produit "
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      
        <input type="file" onChange={(e) => setfile(e.target.files[0])} />

        
        <div className="d-grid  ">
          <br/>
        <Button  className="btn btn-primary" onClick={createProduit}>Créer le produit </Button>
        </div>
        <br/>
        
        <div className="d-grid gap-2 mt-3">
        <Button  className="btn btn-primary" onClick={updateProduit}>Update le produit </Button>
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>
 
    
  );
}
