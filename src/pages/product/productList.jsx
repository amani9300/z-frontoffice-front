import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AppBar from "@material-ui/core/AppBar";
import { DataGrid } from "@mui/x-data-grid";
import { PRODUCTS_COLUMNS } from '../../utils/products.columns';

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`
  }
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

export default function ListProduit({
  setnom,
  setprix,
  setqteDispo,
  setidProduit,
  setdescription,
}) {
  const classes = useStyles();

  const [listProduit, setlistProduit] = useState([])
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
  
  // const columns = PRODUCTS_COLUMNS;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h2" color="primary">
            Users
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PersonAddIcon />}
          >
            New User
          </Button>
        </div>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      </Paper>
    </div>
  )
}
