import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState } from 'react';

import Controls from '../../components/controls/Controls';
import { Form } from '../../components/useForm';
import { Modal } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));
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


export default function ProductForm(
) {

  const [name, setname] = useState('');
  const [barcode, setbarcode] = useState('');
  const [id, setid] = useState('');
  const [reference, setreference] = useState('');
  const [purchasePrice, setpurchasePrice] = useState('');
  const [price, setprice] = useState('');
  const [includesTax, setincludesTax] = useState('');
  const [qty, setqty] = useState('');
  const [measure, setmeasure] = useState('');
  const [category, setcategory] = useState('');
  const [vat, setvat] = useState('');
  const [brand, setbrand] = useState('');
  const [supplier, setsupplier] = useState('');
  const [color, setcolor] = useState('');
  const [image, setimage] = useState('');

  const classes = useStyles();

  // Crée un product
  const createProduct = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("id", id);
    formData.append("barcode", barcode);
    formData.append("reference", reference);
    formData.append("name", name);
    formData.append("purchasePrice", purchasePrice);
    formData.append("price", price);
    formData.append("includesTax", includesTax);
    formData.append("qty", qty);
    formData.append("measure", measure);
    formData.append("category", category);
    formData.append("vat", vat);
    formData.append("brand", brand);
    formData.append("supplier", supplier);
    formData.append("color", color);
    // formData.append("image", image);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("/api/product", formData, config)
      .then((res) => {
        // setlistProducts((listProducts) => [res.data, ...listProducts]);

        cleanForm();
      })
      .catch((err) => console.log(err.response));
  };

  // Mettre à jours un product
  const updateProduct = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("id", id);
    formData.append("barcode", barcode);
    formData.append("reference", reference);
    formData.append("name", name);
    formData.append("purchasePrice", purchasePrice);
    formData.append("price", price);
    formData.append("includesTax", includesTax);
    formData.append("qty", qty);
    formData.append("measure", measure);
    formData.append("category", category);
    formData.append("vat", vat);
    formData.append("brand", brand);
    formData.append("supplier", supplier);
    formData.append("color", color);
    formData.append("image", image);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .put(`/api/product/${id}`, formData, config)
      .then((res) => {
        // const tmp = listProducts.filter((product) => product._id !== id);
        // setlistProducts([res.data, ...tmp]);
        cleanForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={createProduct}>
      <Grid container rowspacing={1} columnspacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly">
        <Grid item xs={6} >
          <Controls.Input
            label="Name"
            type="text"
            placeholder="Enter name"
            value={name}
            onInput={e => setname(e.target.value)}
            required
          />
          <Controls.Input
            label="Barcode"
            type="text"
            placeholder="Enter barcode"
            value={barcode}
            onInput={e => setbarcode(e.target.value)}
            required
          />
          <Controls.Input
            label="Reference"
            type="text"
            placeholder="Enter reference"
            value={reference}
            onInput={e => setreference(e.target.value)}
            required
          />
          <Controls.Input
            label="PurchasePrice"
            type="number"
            placeholder="Enter purchase price"
            value={purchasePrice}
            onInput={e => setpurchasePrice(e.target.value)}
            required
          />
          <Controls.Input
            label="Price"
            type="number"
            placeholder="Enter price"
            value={price}
            onInput={e => setprice(e.target.value)}
            required
          />
          <Controls.Input
            label="IncludesTax"
            type="text"
            value={includesTax}
            onInput={e => setincludesTax(e.target.value)}
            required
          />
          <Controls.Input
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            value={qty}
            onInput={e => setqty(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Measure"
            type="text"
            value={measure}
            required
            onInput={e => setmeasure(e.target.value)}
            placeholder="UNIT"
          />
          <Controls.Input
            label="Category"
            type="text"
            value={category}
            onInput={e => setcategory(e.target.value)}
            required
          />
          <Controls.Input
            label="VAT"
            type="number"
            value={vat}
            onInput={e => setvat(e.target.value)}
            required
          />
          <Controls.Input
            label="Brand"
            type="text"
            value={brand}
            onInput={e => setbrand(e.target.value)}
          />
          <Controls.Input
            label="Supplier"
            type="text"
            value={supplier}
            onInput={e => setsupplier(e.target.value)}
          />
          <Controls.Input
            label="Color"
            type="text"
            value={color}
            onInput={e => setcolor(e.target.value)}
          />
          {/* <Input
            label="Image"
            id="formFileSm"
            type="file"
            spacing='8'
            onInput={ e=>setimage(e.target.value)}
          /> */}

        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="inherit"
        className={classes.button}
      >
        Submit
      </Button>
    </Form>
  );

  function cleanForm() {
    setid("");
    setbarcode("");
    setreference("");
    setname("");
    setpurchasePrice("");
    setprice("");
    setincludesTax("");
    setqty("");
    setmeasure("");
    setcategory("");
    setvat("");
    setbrand("");
    setsupplier("");
    setcolor("");
    setimage("");
  }
}
