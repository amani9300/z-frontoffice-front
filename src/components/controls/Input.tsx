import React from 'react'
import { TextField } from '@material-ui/core';

type TProps = {
    name: string;
    label: string;
    value: string;
    error: any;
    onChange: Function;
}

export default function Input({ name, label, value, error = null, onChange, ...other }: TProps & any) {

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
