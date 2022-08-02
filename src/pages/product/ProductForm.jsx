import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState,useEffect} from 'react';
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


export default function ProductForm({product}
) {

  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [id, setId] = useState('');
  const [reference, setReference] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [price, setPrice] = useState('');
  const [includesTax, setIncludesTax] = useState('');
  const [qty, setQty] = useState('');
  const [measure, setMeasure] = useState('');
  const [category, setCategory] = useState('');
  const [vat, setVat] = useState('');
  const [brand, setBrand] = useState('');
  const [supplier, setSupplier] = useState('');
  const [color, setColor] = useState('');

  const classes = useStyles();
  useEffect(() => {
    if(!product) return;
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
  },  [product])

  // Crée un product
  const submitProduct = (e) => {
    e.preventDefault();

    // let formData = new FormData();
    // formData.append("id", id);
    // formData.append("barcode", barcode);
    // formData.append("reference", reference);
    // formData.append("name", name);
    // formData.append("purchasePrice", purchasePrice);
    // formData.append("price", price);
    // formData.append("includesTax", includesTax);
    // formData.append("qty", qty);
    // formData.append("measure", measure);
    // formData.append("category", category);
    // formData.append("vat", vat);
    // formData.append("brand", brand);
    // formData.append("supplier", supplier);
    // formData.append("color", color);

    //si il existe on le met à jour si non on cée un nouveau
    if(product){
      api.UpdateProduct(id, product)
      .then((res) => {
        // setlistProducts((listProducts) => [res.data, ...listProducts]);
        cleanForm();
      })
      .catch((err) => console.log(err.response));
    } else {
      api.CreateProduct()
      .then((res) => {
        // setlistProducts((listProducts) => [res.data, ...listProducts]);
        cleanForm();
      })
      .catch((err) => console.log(err.response));
    }
   }; 


  return (
    <Form onSubmit={submitProduct}>
      <Grid container rowspacing={1} columnspacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly">
        <Grid item xs={6} >
          <Controls.Input
            label="Name"
            type="text"
            placeholder="Enter name"
            value={name}
            onInput={e => setId(e.target.value)}
            required
          />
          <Controls.Input
            label="Barcode"
            type="text"
            placeholder="Enter barcode"
            value={barcode}
            onInput={e => setBarcode(e.target.value)}
            required
          />
          <Controls.Input
            label="Reference"
            type="text"
            placeholder="Enter reference"
            value={reference}
            onInput={e => setReference(e.target.value)}
            required
          />
          <Controls.Input
            label="PurchasePrice"
            type="number"
            placeholder="Enter purchase price"
            value={purchasePrice}
            onInput={e => setPurchasePrice(e.target.value)}
            required
          />
          <Controls.Input
            label="Price"
            type="number"
            placeholder="Enter price"
            value={price}
            onInput={e => setPrice(e.target.value)}
            required
          />
          <Controls.Input
            label="IncludesTax"
            type="text"
            value={includesTax}
            onInput={e => setIncludesTax(e.target.value)}
            required
          />
          <Controls.Input
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            value={qty}
            onInput={e => setQty(e.target.value)}
            required
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
          />
          <Controls.Input
            label="Category"
            type="text"
            value={category}
            onInput={e => setCategory(e.target.value)}
            required
          />
          <Controls.Input
            label="VAT"
            type="number"
            value={vat}
            onInput={e => setVat(e.target.value)}
            required
          />
          <Controls.Input
            label="Brand"
            type="text"
            value={brand}
            onInput={e => setBrand(e.target.value)}
          />
          <Controls.Input
            label="Supplier"
            type="text"
            value={supplier}
            onInput={e => setSupplier(e.target.value)}
          />
          <Controls.Input
            label="Color"
            type="text"
            value={color}
            onInput={e => setColor(e.target.value)}
          />
          

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
    setId("");
    setBarcode("");
    setBarcode("");
    setId("");
    setPurchasePrice("");
    setPrice("");
    setIncludesTax("");
    setQty("");
    setMeasure("");
    setCategory("");
    setVat("");
    setBrand("");
    setSupplier("");
    setColor("");
  }
}
