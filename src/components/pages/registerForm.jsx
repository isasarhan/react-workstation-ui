import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import AlertDialog from '../common/AlertDialog'
import { registerUser } from '../../services/userServices';
import { myBackgroundColor } from '../../utilities/design/colors';
import RefreshIcon from '@mui/icons-material/Refresh';
import Input from '../common/input';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const schema = Joi.object({
        name: Joi.string().required().min(5).max(10),
        email: Joi.string().required().email({ tlds: { allow: false } }),
        password: Joi.string().min(5),
    }).required()

    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    })
    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data)
            localStorage.setItem("token", response.headers['x-auth-token'])
            navigate('/')
        } catch (ex) {
            if (ex.response && ex.response.status == 400) {
                { toast.error(ex.response.data) }
            }
        }
    }
    const handleAgree = () => {
        setOpen(false)
    }
    const handleDisagree = () => {
        setOpen(false)
        reset()
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
                        <h1>Register User</h1>
                        <Button onClick={() => setOpen(true)} ><RefreshIcon sx={{ color: `${myBackgroundColor}` }}></RefreshIcon></Button>
                    </Box>
                    <Input register={register} label="Name" name="name" />
                    <p>{errors.name?.message}</p>
                    <Input register={register} label="Email" name="email" />
                    <p>{errors.email?.message}</p>
                    <Input register={register} label="Password" name="password" type="password" />
                    <p>{errors.password?.message}</p>
                    <Button sx={{ m: 1, width: '25ch', background: `${myBackgroundColor}` }} variant="contained" type='submit'>Submit</Button>
                </Box>
            </form>

        </div>
    )
}

export default RegisterForm
