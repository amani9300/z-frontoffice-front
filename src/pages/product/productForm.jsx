import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Formproduct({
  listProducts,
  setlistProducts,
  id,
   setid,
  barcode, 
setbarcode,
 reference,
  setreference,
  name, 
  setname,
 purchasePrice, 
 setpurchasePrice,
  price, 
  setprice,
  includesTax, 
  setincludesTax,
  qty, 
  setqty,
  measure, 
  setmeasure,
  category,
   setcategory,
  vat,
   setvat,
  brand, 
  setbrand,
  supplier, 
  setsupplier,
  color, 
  setcolor,
  image, 
  setimage,
}) {
  
  const classes = useStyles();

  // Crée un product
  const createproduct = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("barcode", barcode);
    formData.append("reference", reference);
    formData.append("name", name);
    formData.append(" purchasePrice", purchasePrice);
    formData.append(" price", price);
    formData.append(" includesTax", includesTax);
    formData.append(" qty", qty);
    formData.append(" measure", measure);
    formData.append(" category", category);
    formData.append(" vat", vat);
    formData.append(" brand", brand);
    formData.append("supplier", supplier);
    formData.append("color", color);
    formData.append("image", image);
    

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("/api/product", formData, config)
      .then((res) => {
        setlistProducts((listProducts) => [res.data, ...listProducts]);
      
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
      })
      .catch((err) => console.log(err.response));
  };

  // Mettre à jours un product
  const updateproduct = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("barcode", barcode);
    formData.append("reference", reference);
    formData.append("name", name);
    formData.append(" purchasePrice", purchasePrice);
    formData.append(" price", price);
    formData.append(" includesTax", includesTax);
    formData.append(" qty", qty);
    formData.append(" measure", measure);
    formData.append(" category", category);
    formData.append(" vat", vat);
    formData.append(" brand", brand);
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
        const tmp = listProducts.filter((product) => product._id !== id);
        setlistProducts([res.data, ...tmp]);
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Create product</h3>

      <div className="form-group mt-3">
        <input
          type="text"
          placeholder="Enter le name du product"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <div className="form-group mt-3">
          <input
            type="text"
            placeholder="Enter barcode of product"
            value={barcode}
            onChange={(e) => setbarcode(e.target.value)}
          />

          <div className="form-group mt-3">
            <input
              type="text"
              placeholder="Enter reference of product"
              value={reference}
              onChange={(e) => setreference(e.target.value)}
            />

            <div className="form-group mt-3">
              <input
                type="text"
                placeholder="Enter purchasePrice "
                value={purchasePrice}
                onChange={(e) => setpurchasePrice(e.target.value)}
              />

              <div className="form-group mt-3">
                <input
                  type="text"
                  placeholder="Enter price product "
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Enter includesTax product "
                  value={includesTax}
                  onChange={(e) => setincludesTax(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter qty of product "
                  value={qty}
                  onChange={(e) => setqty(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter measure of product "
                  value={measure}
                  onChange={(e) => setmeasure(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter category of product "
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter vat "
                  value={vat}
                  onChange={(e) => setvat(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter brand of product "
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter supplier "
                  value={supplier}
                  onChange={(e) => setsupplier(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter color of product"
                  value={color}
                  onChange={(e) => setcolor(e.target.value)}
                />

                <div class="mb-3">
                  <label for="formFileSm" class="form-label">
                    Add image of product
                  </label>
                  <input
                    class="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="d-grid  ">
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={createproduct}
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
                {/* <Button className="btn btn-primary" >
                  Créer le product{" "}
                </Button> */}
              </div>

              <br />
              <div className="d-grid gap-2 mt-3">
                <Button onClick={updateproduct}>Update le product </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
