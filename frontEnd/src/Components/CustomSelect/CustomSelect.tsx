import React from 'react';
import { Grid, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


type IGridTypes = boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

const CustomSelect: React.FC<{
    grid: { lg: IGridTypes, md: IGridTypes, sm: IGridTypes, xs?: IGridTypes, }
    error: string,
    label: string,
    onChange: ((event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => void),
    value: string | { Key: string | number, Value: string | number },
    options: Array<{ Key: string | number, Value: string | number } | string | number>
}> = ({ error, label, onChange, value, grid, options }) => {
    const idStr = label.replace(/[ ]/g, "").toLowerCase() + "id";
    return (
        <Grid item lg={grid.lg} md={grid.md} sm={grid.sm} xs={grid.xs || 'auto'}>
            <FormControl fullWidth>
                <InputLabel id={idStr} error={!!error}>{label}</InputLabel>
                <Select
                    fullWidth
                    error={!!error}
                    labelId={idStr}
                    id={idStr + "2"}
                    value={value}
                    onChange={onChange}
                >
                    {
                        options.length > 0 &&
                        options.map((item, index) => {
                            return (
                                <MenuItem key={index} value={typeof item === "object" ? item.Key : item}>{typeof item === "object" ? item.Value : item}</MenuItem>
                            )
                        })
                    }
                </Select>
                {(!!error) &&
                    <FormHelperText error={!!error}>{error}</FormHelperText>
                }
            </FormControl>
        </Grid>
    )
}

export default CustomSelect;