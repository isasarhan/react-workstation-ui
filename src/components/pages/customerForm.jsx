import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { useForm } from 'react-hook-form';
import Input from '../common/input';
import { getCustomer, saveCustomer } from '../../services/customerServices';
import { myBackgroundColor } from '../../utilities/design/colors';
import RefreshIcon from '@mui/icons-material/Refresh';
import AlertDialog from '../common/AlertDialog';
import { useParams } from 'react-router-dom';

const CustomerForm = () => {

    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);

    let params = useParams()

    const schema = Joi.object({
        name: Joi.string().required().min(5),
        mobile: Joi.string().required().min(7),
        home: Joi.string().min(5),
        city: Joi.string(),
        country: Joi.string(),
    }).required() 

    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    })

    const getData = async (id) => {
        console.log(id);
        const { data } = await getCustomer(id)

        setValue("name", data.name)
        setValue("mobile", data.mobile)
        setValue("home", data.home)
        setValue("country", data.address.country)
        setValue("city", data.address.city)
        setFocused(true)
    }
    useEffect(() => {
        if (params.id)
            getData(params.id)
    }, [])

    const onSubmit = async (data) => {
        if(params.id){
            data = {
                _id: params.id,
                ...data
            }
        }
        console.log(data)
        await saveCustomer(data)
    }
    const handleAgree = () => {
        setOpen(false)
    }
    const handleDisagree = () => {
        setOpen(false)
        reset()
    }
    const isFocused = () => {
        if (focused) return { focused: true }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AlertDialog open={open} title="WARNING"
                    content="Are you sure you want to clear the fields?"
                    handleAgree={handleAgree}
                    handleDisagree={handleDisagree} />
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>Customer</h1>
                        <Button onClick={() => setOpen(true)} ><RefreshIcon sx={{ color: `${myBackgroundColor}` }}></RefreshIcon></Button>
                    </Box>
                    <Input register={register} label="Name" name="name" {...isFocused()} />
                    <p>{errors.name?.message}</p>
                    <Input register={register} label="Mobile" name="mobile"  {...isFocused()} />
                    <p>{errors.mobile?.message}</p>
                    <Input register={register} label="Home" name="home"  {...isFocused()} />
                    <p>{errors.home?.message}</p>
                    <Input register={register} label="Country" name="country"  {...isFocused()} />
                    <p>{errors.country?.message}</p>
                    <Input register={register} label="City" name="city"  {...isFocused()} />
                    <p>{errors.city?.message}</p>
                    <Button sx={{ m: 1, width: '25ch', background: `${myBackgroundColor}` }} variant="contained" type='submit'>Submit</Button>
                </Box>
            </form>

        </div>
    );
}

export default CustomerForm