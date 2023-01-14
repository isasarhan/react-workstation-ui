import React, { useEffect, useState } from 'react'
import Table from '../common/table';
import { getBalances } from '../../services/balanceServices';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { myBackgroundColor } from '../../utilities/design/colors'

const BalanceTable = () => {
    const [balances, setBalances] = useState([])
    const [refresh, setRefresh] = useState(false)

    const columns = [
        { field: "_id", headerName: "Id", width: 200, },
        { field: "customerid", headerName: "Customer ID", width: 150, valueGetter: (balance) => balance.row.customer.customerid },
        { field: "name", headerName: "Name", width: 150, valueGetter: (balance) => balance.row.customer.name },
        { field: "gold", headerName: "Gold", width: 150, },
        { field: 'cash', headerName: 'Cash', width: 150 },
    ]

    // state = {
    //     customers: []
    // }

    const initializeTable = async () => {
        const { data } = await getBalances()
        console.log(data);
        setBalances(data)
    }

    useEffect(() => {
        initializeTable()
    }, [refresh])
    return (
        <div style={{ height: 400, margin: 20 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1, justifyContent: 'space-between' }}>
                <NavLink to="/balances/add" style={{ color: 'white', textDecoration: 'none' }} >
                    <Button variant="contained" sx={{ background: `${myBackgroundColor}` }}>Add Balance
                    </Button>
                </NavLink>
                <Button onClick={() => setRefresh(refresh => !refresh)} ><RefreshIcon sx={{ color: `${myBackgroundColor}` }}></RefreshIcon></Button>
            </Box>
            <Table columns={columns} rows={balances} pageSize="5" rowPerPage="5" />
        </div>)
}

export default BalanceTable
