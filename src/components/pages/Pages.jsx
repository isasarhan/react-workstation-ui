import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BalanceTable from '../pages/balanceTable'
import CustomerForm from '../pages/customerForm'
import CustomersTable from '../pages/customersTable'
import BalanceForm from './balanceForm'
import Home from './Home'

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/customers/add' element={<CustomerForm/>}/>  
      <Route path='/customers/add/:id' element={<CustomerForm/>}/>  
      <Route path='/customers' element={<CustomersTable/>}/>
      <Route path='/balances/add' element={<BalanceForm/>}/>
      <Route path='/balances/' element={<BalanceTable/>}/>
    </Routes>
  )
}

export default Pages
