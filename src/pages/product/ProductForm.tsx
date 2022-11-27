import { CircularProgress, Grid } from '@material-ui/core';
import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import { Form } from '../../components/useForm';
import { Product } from '../../models/product';
import { api } from '../../services/api';

export default function ProductForm({ product, refresh, close }: { product: Product | undefined, refresh: Function, close: Function }) {

  const [name, setName] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [id, setId] = useState<string | undefined>();
  const [reference, setReference] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [includesTax, setIncludesTax] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [measure, setMeasure] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [vat, setVat] = useState<number>(0);
  const [brand, setBrand] = useState<string>('');
  const [supplier, setSupplier] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

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
  const submitProduct = (e: any) => {
    e.preventDefault();

    setLoading(true);

    //si il existe on le met à jour si non on cée un nouveau
    if (product && id) {
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
        .then(() => {
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
        .then(() => {
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
      {error && <Alert severity="error">{error}</Alert>}

      <Form onSubmit={submitProduct}>
        <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly">
          <Grid item xs={6} >
            <Controls.Input
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onInput={(e: any) => setName(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Barcode"
              type="text"
              placeholder="Enter barcode"
              value={barcode}
              onInput={(e: any) => setBarcode(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Reference"
              type="text"
              placeholder="Enter reference"
              value={reference}
              onInput={(e: any) => setReference(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="PurchasePrice"
              type="number"
              placeholder="Enter purchase price"
              value={purchasePrice}
              onInput={(e: any) => setPurchasePrice(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Price"
              type="number"
              placeholder="Enter price"
              value={price}
              onInput={(e: any) => setPrice(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Checkbox
              label="IncludesTax"
              value={includesTax}
              onChange={(e: any) => setIncludesTax(e.target.value)}
              required
            />
            <Controls.Input
              label="Quantity"
              type="number"
              placeholder="Enter quantity"
              value={qty}
              onInput={(e: any) => setQty(e.target.value)}
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
              onInput={(e: any) => setMeasure(e.target.value)}
              placeholder="UNIT"
              disabled={loading}
            />
            <Controls.Input
              label="Category"
              type="text"
              value={category}
              onInput={(e: any) => setCategory(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="VAT"
              type="number"
              value={vat}
              onInput={(e: any) => setVat(e.target.value)}
              required
              disabled={loading}
            />
            <Controls.Input
              label="Brand"
              type="text"
              value={brand}
              onInput={(e: any) => setBrand(e.target.value)}
              disabled={loading}
            />
            <Controls.Input
              label="Supplier"
              type="text"
              value={supplier}
              onInput={(e: any) => setSupplier(e.target.value)}
              disabled={loading}
            />
            <Controls.Input
              label="Color"
              type="text"
              value={color}
              onInput={(e: any) => setColor(e.target.value)}
              disabled={loading}
            />

          </Grid>
        </Grid>

        
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginRight: '20px' }}>
          {loading && <CircularProgress size={14} style={{ marginRight: '10px' }} />} Submit
        </button>
        {/* </Button> */}

       
        <button type="button" className="btn" onClick={() => { if (close) close() }} disabled={loading}> Close </button>

      </Form>
    </>
  );

  function cleanForm() {
    setId("");
    setName("");
    setBarcode("");
    setReference("");
    setPurchasePrice(0);
    setPrice(0);
    setIncludesTax(false);
    setQty(0);
    setMeasure("");
    setCategory("");
    setVat(0);
    setBrand("");
    setSupplier("");
    setColor("");
    setError(undefined);
    setLoading(false);
  }
}
