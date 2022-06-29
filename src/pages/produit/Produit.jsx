import React, { useState } from 'react';

import FormProduit from './FormProduit';

export default function Produit() {
  const [listProduit, setlistProduit] = useState([]);
  const [nom, setnom] = useState("");
  const [prix, setprix] = useState("");
  const [qteDispo, setqteDispo] = useState("");
  const [description, setdescription] = useState("");
  const [file, setfile] = useState("");
  const [idProduit, setidProduit] = useState("");
  return (
    <div>
      <FormProduit
        listProduit={listProduit}
        setlistProduit={setlistProduit}
        nom={nom}
        setnom={setnom}
        prix={prix}
        setprix={setprix}
        qteDispo={qteDispo}
        setqteDispo={setqteDispo}
        description={description}
        setdescription={setdescription}
        file={file}
        setfile={setfile}
        idProduit={idProduit}
        setidProduit={setidProduit}
      />
      
    </div>
  );
}
