import React, { useEffect, useState } from 'react'
import Table from '../common/table';
import { deleteBalances, getBalances } from '../../services/balanceServices';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { myBackgroundColor } from '../../utilities/design/colors'
import DesignButton from '../common/button';

const BalanceTable = () => {
    const [balances, setBalances] = useState([])
    const [refresh, setRefresh] = useState(false)

    const onDelete = async (id) => {
        const originalValues = [...balances]
        const filtered = originalValues.filter(value => value._id !== id)
        setBalances(filtered)
        try {
            const response = await deleteBalances(id)
            console.log(response);
        } catch (err) {
            setBalances(originalValues)
        }
    }

    const linkButton = (id) => {

        return <NavLink to={`/balances/add/${id}`} ><DesignButton text="Edit" /></NavLink>
    }
    const columns = [
        { field: "_id", headerName: "Id", width: 200, },
        { field: "customerid", headerName: "Customer ID", width: 150, valueGetter: (balance) => balance.row.customer.customerid },
        { field: "name", headerName: "Name", width: 150, valueGetter: (balance) => balance.row.customer.name },
        { field: "gold", headerName: "Gold", width: 150, },
        { field: 'cash', headerName: 'Cash', width: 150 },
        { field: 'edit', headerName: 'Edit', width: 150, renderCell: (balance) => linkButton(balance.row._id) },
        { field: 'delete', headerName: 'Delete', width: 150, renderCell: (balance) => (<DesignButton text="Delete" onClick={() => onDelete(balance.row._id)} />) },

    ]

    // state = {
    //     customers: []
    // }

    const initializeTable = async () => {
        
        const check = localStorage.getItem("balances")
        if (check) {
            setBalances(JSON.parse(check))
        }
        else {
            const { data } = await getBalances()
            setBalances(data)
            localStorage.setItem("balances", JSON.stringify(data))
        }
    }

    useEffect(() => {
        initializeTable()
    }, [refresh])
    return (
        <div style={{ height: 400, margin: 20 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1, justifyContent: 'space-between' }}>
                <NavLink to="/balances/add" style={{ color: 'white', textDecoration: 'none' }} >
                    <DesignButton text="Add Balance"/>
                </NavLink>
                <Button onClick={() => setRefresh(refresh => !refresh)} ><RefreshIcon sx={{ color: `${myBackgroundColor}` }}></RefreshIcon></Button>
            </Box>
            <Table columns={columns} rows={balances} pageSize="5" rowPerPage="5" />
        </div>)
}

export default BalanceTable
