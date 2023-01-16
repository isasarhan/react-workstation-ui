import React, { useEffect, useState } from 'react'
import Table from '../common/table';
import { getCustomers } from '../../services/customerServices';
import { Box, Button } from '@mui/material';
import DesignButton from '../common/button';
import { NavLink } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { myBackgroundColor } from '../../utilities/design/colors'
import { deleteCustomer } from '../../services/customerServices';

const CustomersTable = () => {
    const [customers, setCustomers] = useState([])
    const [refresh, setRefresh] = useState(false)

    const onDelete = async (id) => {
        const originalValues = [...customers]
        const filtered = originalValues.filter(value => value._id !== id)
        setCustomers(filtered)
        try {
            const response = await deleteCustomer(id)
            console.log(response);
        } catch (err) {
            setCustomers(originalValues)
        }
    }

    const linkButton = (id) => {

        return <NavLink to={`/customers/add/${id}`} ><DesignButton text="Edit" /></NavLink>
    }

    const columns = [
        { field: "_id", headerName: "Id", width: 200, },
        { field: "name", headerName: "Name", width: 150, },
        { field: "mobile", headerName: "Mobile", width: 150, },
        { field: "home", headerName: "Home", width: 150, },
        { field: 'country', headerName: 'Country', width: 150, valueGetter: (customers) => customers.row.address.country },
        { field: 'city', headerName: 'City', width: 150, valueGetter: (customers) => customers.row.address.city },
        { field: 'edit', headerName: 'Edit', width: 150, renderCell: (customers) => linkButton(customers.row._id) },
        { field: 'delete', headerName: 'Delete', width: 150, renderCell: (customers) => (<DesignButton text="Delete" onClick={() => onDelete(customers.row._id)} />) },
    ]
    const initializeTable = async () => {

        const check = localStorage.getItem("customers")
        if (check) {
            setCustomers(JSON.parse(check))
        }
        else {
            const { data } = await getCustomers()
            setCustomers(data)
            localStorage.setItem("customers", JSON.stringify(data))
        }
    }

    useEffect(() => {
        initializeTable()
    }, [refresh])

    return (
        <div style={{ height: 400, margin: 20 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1, justifyContent: 'space-between' }}>
                <NavLink to="/customers/add" style={{ color: 'white', textDecoration: 'none' }} >
                    <DesignButton text="Add Customer" />
                </NavLink>
                <Button onClick={() => setRefresh(refresh => !refresh)} >
                    <RefreshIcon sx={{ color: `${myBackgroundColor}` }} />
                </Button>
            </Box>
            <Table columns={columns} rows={customers} pageSize="5" rowPerPage="5" />
        </div>)
}
export default CustomersTable
