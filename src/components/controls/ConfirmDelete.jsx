import React, { useState } from "react"
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase } from "@material-ui/core";
import Button from "./Button";

export const ConfirmDelete = ({ open, name, id, handleRemove }) => {

  return (
    <Dialog
      open={open}
      onClose={() => { }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete <b>{name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { handleRemove(id); }} severity="error">Yes</Button>
        <Button onClick={() => {  }} autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  )
}