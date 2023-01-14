import { joiResolver } from '@hookform/resolvers/joi';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { myBackgroundColor } from '../../utilities/design/colors';
import Input from '../common/input';
import RefreshIcon from '@mui/icons-material/Refresh';
import { saveBalance } from '../../services/balanceServices';
import { getCustomers } from '../../services/customerServices';
import _ from 'lodash';
import AlertDialog from '../common/AlertDialog';

const AddBalance = () => {

    const [customer, setCustomer] = useState()
    const [customers, setCustomers] = useState([{ _id: "1", name: "issa" }, { _id: "2", name: "ahmad" }])
    const [open, setOpen] = useState(false);

    const schema = Joi.object({
        customers: Joi.string().required(),
        gold: Joi.number(),
        cash: Joi.number(),
    }).required()
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    })
    const initialize = async () => {
        const { data } = await getCustomers()
        const result = data.map(d => _.pick(d, ["_id", "name"]))
        setCustomers(result)
        console.log(customers);
    }
    useEffect(() => {
        initialize()
    })
    const onSubmit = async (data) => {
        const balance = {
            customerid: customer._id,
            name: customer.name,
            gold: data.gold,
            cash: data.cash
        }
        console.log(balance)
        saveBalance(balance)
    }
    const autoCompleteChange = (e, v) => {
        const result = customers.find(c => c.name === v)
        setCustomer(result)
    }
    const handleAgree = () => {
        setOpen(false)
        console.log("Yes")
    }
    const handleDisagree = () => {
        setOpen(false)
        console.log("Yes")
        reset()
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AlertDialog open={open}
                    title="WARNING"
                    content="Are you sure you want to clear the fields?"
                    handleAgree={handleAgree}
                    handleDisagree={handleDisagree} />
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>Balance</h1>
                        <Button onClick={() => setOpen(true)} ><RefreshIcon sx={{ color: `${myBackgroundColor}` }}></RefreshIcon></Button>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        options={customers.map(c => c.name)}
                        sx={{ m: 1 }}
                        renderInput={(params) => (<>
                            <TextField {...params} {...register} name="customers" label="Customers" />
                            <p>{errors.customers?.message}</p>
                        </>)}
                        onChange={autoCompleteChange}
                    />

                    <Input register={register} label="Gold" name="gold" sx={{ m: 1 }} />
                    <p>{errors.gold?.message}</p>

                    <Input register={register} label="Cash" name="cash" sx={{ m: 1 }} />
                    <p>{errors.cash?.message}</p>
                    <Button sx={{ m: 1, width: '25ch', background: `${myBackgroundColor}` }} variant="contained" type='submit'>Submit</Button>
                </Box>


            </form>
        </div>
    )
}

export default AddBalance
