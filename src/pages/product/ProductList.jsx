import React, { useEffect, useState } from 'react';
import axios from 'axios';import CssBaseline from "@material-ui/core/CssBaseline";
import {InputBase} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import AddIcon from '@mui/icons-material/Add';
import AppBar from "@material-ui/core/AppBar";
import { PRODUCTS_COLUMNS } from '../../utils/products.columns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ProductForm from './ProductForm';
import { Paper, makeStyles,TableRow, TableCell,Toolbar } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SearchIcon from '@material-ui/icons/Search';
import './ProductStyle.css';





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

const listColumns = PRODUCTS_COLUMNS;
const headCells = [
  
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ProductList() {

  const [product, setProduct] = useState();
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
  // on close, refresh list

  useEffect(() =>{handleClose()},[listProducts])
  // const handleClose = (e) => {
  //   console.log('Closing modal with data: ', e)
  //   setOpen(false);
  // };

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState((listProducts))

  const [openModal, setOpenModal] = useState(false)

  const openInModal = product => {
    setRecordForEdit(product);
    setOpenModal(true);
}

  const [listProducts, setlistProducts] = useState([])
  // Récuperer la liste des products de l'utilisateur connecté
  useEffect(() => {
    console.log('listProducts')
    getProducts()
  }, [setlistProducts]);

  const getProducts= ()=> {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/json/products.json", config)
      .then((res) => setlistProducts(res.data))
      .catch((err) => console.log(err.response));
  }
  // Supprimer un product
  const deleteProduct = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/product/${id}`, config)
      .then((res) => {
       getProducts() // setlistProducts(listProducts.filter((product) => product._id !== id)); 
      })
      .catch((err) => {getProducts(); console.log(err.response)});
  };

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };


  // Mettre à jours le formulaire
  const updateForm = (product) => {
   
    setProduct(product);
    setOpen(true);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
   
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
        <InputBase
                            placeholder="Search topics"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                        />
     
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
            startIcon={<AddIcon />}
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
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                {product? "Modify": "Create"} product
                <div>
                  <ProductForm product={product}/>
                  
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
       
        {/* <Table
          // columns={listColumns}
          // data={listProducts}
          // defaultSortField="name"
          // sortIcon={<SortIcon />}
          // fixedHeader
          // fixedHeaderScrollHeight="80vh"
          // pagination
          // responsive
          // subHeaderAlign="right"
          // subHeaderWrap
          // selectableRows
          // selectableRowsComponent={Checkbox}
          // selectableRowsComponentProps={selectableRowsComponentProps}
          
        /> */}
        <div style={{overflow:'auto'}}>
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
            <th >Image</th>
            
            <th>btn</th> 
            
        </tr>
    </thead>
    <tbody>
    {listProducts.map((product, i) => (
        <tr key={i} >
        <td >{product.id}</td>
        <td >{product.barcode}</td>
        <td >{product.reference}</td>
        <td >{product.name}</td>
        <td >{product.purchasePrice}</td>
        <td >{product.price}</td>
        <td >{product.qty}</td>
        <td >{product.measure}</td>
        <td >{product.category}</td>
        <td >{product.vat}</td>
        <td >{product.brand}</td>
        <td >{product.supplier}</td>
        <td >{product.color}</td>
        <td >{product.image}</td>

        
        <td>  <Controls.ActionButton
            color="primary"
            onClick={() => {
              updateForm(product);
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </Controls.ActionButton>
          <Controls.ActionButton color="secondary"  onClick={() => {
              deleteProduct(product.id);}}
          >
            <CloseIcon fontSize="small" />
          </Controls.ActionButton></td>

        </tr>
    ))
    }
</tbody>
</table>
</div>
      </Paper>
    </div>
  );
}