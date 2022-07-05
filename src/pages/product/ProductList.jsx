import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from '@mui/icons-material/Add';
import AppBar from "@material-ui/core/AppBar";
import { PRODUCTS_COLUMNS } from '../../utils/products.columns';
import DataTable from 'react-data-table-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ProductForm from './ProductForm';

const style = {
  position: 'absolute',
  top: '55vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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

const listColumns = PRODUCTS_COLUMNS;

export default function ProductList({
  // setnom,
  // setprix,
  // setqteDispo,
  // setidproduct,
  // setdescription,
}) {

  const [id, setid] = useState("");
  const [barcode, setbarcode] = useState("");
  const [reference, setreference] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [price, setprice] = useState("");
  const [includesTax, setincludesTax] = useState("");
  const [qty, setqty] = useState("");
  const [measure, setmeasure] = useState("");
  const [category, setcategory] = useState("");
  const [vat, setvat] = useState("");
  const [brand, setbrand] = useState("");
  const [supplier, setsupplier] = useState("");
  const [color, setcolor] = useState("");
  const [image, setimage] = useState("");


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const [listProducts, setlistProducts] = useState([])
  // Récuperer la liste des products de l'utilisateur connecté
  useEffect(() => {
    console.log('listProducts')
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/json/products.json", config)
      .then((res) => setlistProducts(res.data))
      .catch((err) => console.log(err.response));
  }, [setlistProducts]);


  // Supprimer un product
  const deleteproduct = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/product/${id}`, config)
      .then((res) => {
        setlistProducts(listProducts.filter((product) => product._id !== id));
      })
      .catch((err) => console.log(err.response));
  };

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };


  // Mettre à jours le formulaire
  const updateForm = (product) => {
   
    setid(product._id);
        setbarcode(product.barcode);
        setreference(product.reference);
        setname(product.name);
        setpurchasePrice(product.purchasePrice);
        setprice(product.price);
        setincludesTax(product.includesTax);
        setqty(product.qty);
        setmeasure(product.measure);
        setcategory(product.category);
        setvat(product.vat);
        setbrand(product.brand);
        setsupplier(product.supplier);
        setcolor(product.color);
        setimage(product.image);
  
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
            startIcon={<AddIcon/>}
            onClick={handleOpen}
          >
            New Product
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div>
                  <ProductForm
                    // listProducts={listProducts}
                    // setlistProductsss={setlistProductsss}
                    name={name}
                    setname={setname}
                    price={price}
                    setprice={setprice}
                    qty={qty}
                    setqty={setqty}
                    description={description}
                    setdescription={setdescription}
                    image={image}
                    setimage={setimage}
                    id={id}
                    setid={setid}
                  />
                </div>
              </Typography>
          
            </Box>
          </Modal>
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
  );
}