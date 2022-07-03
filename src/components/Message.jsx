import { Alert } from "@mui/material";
import React from "react";

export default function Message() {
  return <>
    <Alert variant="danger">
      Erreur lors du chargement des données
    </Alert>
  </>
}
