import axios from "axios";
import React from "react";

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
    <div>
      <div>
        <input
          type="text"
          placeholder="nom"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="prix"
          value={prix}
          onChange={(e) => setprix(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="quantité disponible"
          value={qteDispo}
          onChange={(e) => setqteDispo(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <br />
        <br />
        <input type="file" onChange={(e) => setfile(e.target.files[0])} />

        <br />
        <br />
        <button onClick={createProduit}>Créer le produit </button>
        <button onClick={updateProduit}>Update le produit </button>
      </div>
    </div>
  );
}
