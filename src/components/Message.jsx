import React from "react";
import { Alert } from "react-bootstrap";

export default function Message() {
  return <>
    <Alert variant="danger">
      Erreur lors du chargement des données
    </Alert>
  </>
}
