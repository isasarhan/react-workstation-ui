import { Autocomplete, Input } from '@mui/material'
import React from 'react'

const AutoComplete = ({ label, register, name, value, data, ...rest }) => {
    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data}
                sx={{ width: 300 }}
                renderInput={(params) => (<Input {...params} name={name} register={register} label={label} />)}
            />
        </>
    )
}

export default AutoComplete
