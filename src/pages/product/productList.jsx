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
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/ArrowDownward";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from "@material-ui/core/AppBar";
import { PRODUCTS_COLUMNS } from '../../utils/products.columns';
import DataTable from 'react-data-table-component';

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

const listColumns = PRODUCTS_COLUMNS;

export default function ListProduit({
  setnom,
  setprix,
  setqteDispo,
  setidProduit,
  setdescription,
}) {
  const classes = useStyles();

  const [listProducts, setlistProduit] = useState([])
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
        setlistProduit(listProducts.filter((produit) => produit._id !== id));
      })
      .catch((err) => console.log(err.response));
  };

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };


  // Mettre à jours le formulaire
  const updateForm = (produit) => {
    setnom(produit.nom);
    setprix(produit.prix);
    setqteDispo(produit.qteDispo);
    setdescription(produit.description);
    setidProduit(produit._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

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
            Centimoo Stock Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h2" color="primary">
            Products
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
          >
            New Product
          </Button>
        </div>

        <DataTable
          columns={listColumns}
          data={listProducts}
          defaultSortField="name"
          sortIcon={<SortIcon />}
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          pagination
          responsive
          subHeaderAlign="right"
          subHeaderWrap
          selectableRows
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectableRowsComponentProps}
        />
      </Paper>
    </div>
  )
}
