import React, { useState } from "react";
import FormProduit from "./FormProduit";
import ListProduit from "./ListProduit";

export default function Produite() {
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
      <ListProduit
        listProduit={listProduit}
        setlistProduit={setlistProduit}
        setnom={setnom}
        setprix={setprix}
        setqteDispo={setqteDispo}
        setdescription={setdescription}
        setfile={setfile}
        setidProduit={setidProduit}
      />
    </div>
  );
}
