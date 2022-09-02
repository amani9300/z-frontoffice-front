import React, { useEffect, useState } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductForm from './ProductForm';
import { Paper, makeStyles } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import './ProductStyle.css';
import { api } from '../../services/api';
import { ConfirmDelete } from '../../components/controls/ConfirmDelete';
import { Product } from '../../models/product';

const style = {
  position: 'absolute',
  top: '55vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

export default function ProductList() {

  const [product, setProduct] = useState<Product | undefined>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [remove, setRemove] = useState<string | undefined>();

  const classes = useStyles();
  const [listProducts, setlistProducts] = useState<Product[]>([]);

  // Récuperer la liste des products de l'utilisateur connecté
  useEffect(() => {
    getProducts()
  }, [setlistProducts]);

  const getProducts = () => {
    setLoading(true);
    api.GetProducts()
      .then((res) => setlistProducts(res.data))
      .catch((err) => console.log(err.response))
      .finally(() => setLoading(false))
  }

  const handleRemove = (id: string) => {
    setRemove(undefined);
    if (id) {
      api.DeleteProduct(id)
        .then(() => {
          getProducts();
        })
        .catch((err) => { getProducts(); console.log(err.response) });
    }
  }

  // Mettre à jours le formulaire
  const updateForm = (product: Product | undefined) => {
    setProduct(product);
    setOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <section className='products'>
      <CssBaseline />

      <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h2" color="primary">Products</Typography>

          {/* <Button variant="outlined" color="secondary" startIcon={<AddIcon />} onClick={() => updateForm()}> New Product </Button> */}
          <button className="btn btn-primary" onClick={() => updateForm(undefined)}> + New Product </button>

          <Modal open={open} onClose={() => setOpen(false)} arial-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                {product ? "Modify" : "Create"} product
                <div>
                  <ProductForm product={product} refresh={getProducts} close={() => setOpen(false)} />
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>

        <div style={{ overflow: 'auto' }}>
          <table className="styled-table">
            <thead >
              <tr >
                <th >Id</th>
                <th >Name</th>
                <th >Barcode</th>
                <th >Reference</th>
                <th >Purcentage</th>
                <th >Price</th>
                <th >IncludesTax</th>
                <th >Quantity</th>
                <th >Measure</th>
                <th >Category</th>
                <th >VAT</th>
                <th >Brand</th>
                <th >Supplier</th>
                <th >Color</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {listProducts.map((product, i) => (
                <tr key={i} >
                  <td >{product.id}</td>
                  <td >{product.name}</td>
                  <td >{product.barcode}</td>
                  <td >{product.reference}</td>
                  <td >{product.purchasePrice}</td>
                  <td >{product.price}</td>
                  <td >{product.includesTax ? 'Yes' : 'No'}</td>
                  <td >{product.qty}</td>
                  <td >{product.measure}</td>
                  <td >{product.category}</td>
                  <td >{product.vat}</td>
                  <td >{product.brand}</td>
                  <td >{product.supplier}</td>
                  <td >{product.color}</td>
                  <td>
                    <Controls.ActionButton color="primary" onClick={() => { updateForm(product); }}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary" onClick={() => { setRemove(product.id); }}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>

                    <ConfirmDelete name={product.name} id={product.id} handleRemove={handleRemove} open={remove === product.id} />
                  </td>
                </tr>
              ))}
              {
                loading &&
                <tr>
                  <td colSpan={14} align='center'>
                    <CircularProgress size={18} />
                  </td>
                </tr>
              }
              {
                !loading && !listProducts.length &&
                <tr>
                  <td colSpan={14} align='center'>
                    No products found
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </Paper>
    </section>
  );
}

