import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "./Button";


type TProps = {
  open: boolean;
  name: string;
  id?: string;
  handleRemove: Function;
}

export const ConfirmDelete = ({ open, name, id, handleRemove }: TProps) => {

  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete <b>{name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { handleRemove(id); }} variant="contained" color="secondary" text='Yes' />
        <Button onClick={() => { handleRemove(); }} autoFocus text='No' />
      </DialogActions>
    </Dialog>
  )
}