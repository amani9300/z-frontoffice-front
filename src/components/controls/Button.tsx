import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(8)
           
    },
   
    label: {
        textTransform: 'none'
      
    }
}))

type TProps = {
    text: string;
    size?: "medium" | "large" | "small";
    color: "inherit" | "default" | "primary" | "secondary" | undefined;
    variant: "text" | "outlined" | "contained" | undefined;
    onClick: any;
}

export default function Button({ text, size, color, variant, onClick, ...other }: TProps & any) {

    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}
