import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

type TProps = {
    name: string;
    label: string;
    value: boolean;
    onChange: any;
}

export default function Checkbox({ name, label, value, onChange, ...other }: TProps & any) {

    const convertToDefEventPara = (name: string, value: boolean) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
