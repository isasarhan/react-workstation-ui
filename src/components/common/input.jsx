import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Input = ({ name, label, register ,...rest}) => {

  return (
    <>
      <TextField     
        {...rest}
        label={label}
        {...register(name)}
        id="outlined-start-adornment"
        sx={{ m: 1 }}
      />


    </>
  )
}

export default Input
