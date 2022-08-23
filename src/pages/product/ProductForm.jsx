import { Button, CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import { Form } from '../../components/useForm';
import { api } from '../../services/api';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))


export default function ProductForm({ product, refresh, close }) {

  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [id, setId] = useState('');
  const [reference, setReference] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [price, setPrice] = useState('');
  const [includesTax, setIncludesTax] = useState(false);
  const [qty, setQty] = useState('');
  const [measure, setMeasure] = useState('');
  const [category, setCategory] = useState('');
  const [vat, setVat] = useState('');
  const [brand, setBrand] = useState('');
  const [supplier, setSupplier] = useState('');
  const [color, setColor] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const classes = useStyles();
  useEffect(() => {
    if (!product) return;
    setId(product.id)
    setName(product.name)
    setBarcode(product.barcode)
    setReference(product.reference)
    setPurchasePrice(product.purchasePrice)
    setPrice(product.price)
    setIncludesTax(product.includesTax)
    setQty(product.qty)
    setMeasure(product.measure)
    setCategory(product.category)
    setVat(product.vat)
    setBrand(product.brand)
    setSupplier(product.supplier)
    setColor(product.color)
  }, [product])

  // Crée un product
  const submitProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    //si il existe on le met à jour si non on cée un nouveau
    if (product) {
      api.UpdateProduct(id, {
        name,
        barcode,
        reference,
        purchasePrice,
        price,
        includesTax,
        qty,
        measure,
        category,
        vat,
        brand,
        supplier,
        color,
      })
        .then((res) => {
          // setlistProducts((listProducts) => [res.data, ...listProducts]);
          cleanForm();
          if (refresh) refresh();
        })
        .catch((err) => setError(err.response.data.message))
        .finally(() => setLoading(false))
    } else {
      api.CreateProduct({
        name,
        barcode,
        reference,
        purchasePrice,
        price,
        includesTax,
        qty,
        measure,
        category,
        vat,
        brand,
        supplier,
        color,
      })
        .then((res) => {
          // setlistProducts((listProducts) => [res.data, ...listProducts]);
          cleanForm();
          if (refresh) refresh();
        })
        .catch((err) => setError(err.response.data.message))
        .finally(() => setLoading(false))
    }
  };


  return (
    <>
      { error && <Alert severity="error">{error}</Alert> }

      <Form onSubmit={submitProduct}>
        <Grid container rowspacing={1} columnspacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly">
          <Grid item xs={6} >
            <Controls.Input
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onInput={e => setName(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Barcode"
              type="text"
              placeholder="Enter barcode"
              value={barcode}
              onInput={e => setBarcode(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Reference"
              type="text"
              placeholder="Enter reference"
              value={reference}
              onInput={e => setReference(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="PurchasePrice"
              type="number"
              placeholder="Enter purchase price"
              value={purchasePrice}
              onInput={e => setPurchasePrice(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Price"
              type="number"
              placeholder="Enter price"
              value={price}
              onInput={e => setPrice(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Checkbox
              label="IncludesTax"
              value={includesTax}
              onChange={e => setIncludesTax(e.target.value)}
              required
            />
            <Controls.Input
              label="Quantity"
              type="number"
              placeholder="Enter quantity"
              value={qty}
              onInput={e => setQty(e.target.value)}
              required
              disabled={loading}
            />
          </Grid>

          <Grid item xs={6}>
            <Controls.Input
              label="Measure"
              type="text"
              value={measure}
              required
              onInput={e => setMeasure(e.target.value)}
              placeholder="UNIT"
              disabled={loading}
            />
            <Controls.Input
              label="Category"
              type="text"
              value={category}
              onInput={e => setCategory(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="VAT"
              type="number"
              value={vat}
              onInput={e => setVat(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Brand"
              type="text"
              value={brand}
              onInput={e => setBrand(e.target.value)}
              disabled={loading}
            />
            <Controls.Input
              label="Supplier"
              type="text"
              value={supplier}
              onInput={e => setSupplier(e.target.value)}
              disabled={loading}
            />
            <Controls.Input
              label="Color"
              type="text"
              value={color}
              onInput={e => setColor(e.target.value)}
              disabled={loading}
            />


          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="inherit"
          className={classes.button}
          disabled={loading}
          style={{ marginRight: '20px' }}
        >
          {loading && <CircularProgress size={14} style={{ marginRight: '10px' }} />} Submit
        </Button>

        <Button type="button" variant="contained" color="inherit" onClick={() => { if (close) close() }} disabled={loading}> Close </Button>

      </Form>
    </>
  );

  function cleanForm() {
    setId("");
    setName("");
    setBarcode("");
    setReference("");
    setPurchasePrice("");
    setPrice("");
    setIncludesTax(false);
    setQty("");
    setMeasure("");
    setCategory("");
    setVat("");
    setBrand("");
    setSupplier("");
    setColor("");
    setError();
    setLoading();
  }
}
