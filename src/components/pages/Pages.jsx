import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BalanceTable from '../pages/balanceTable'
import CustomerForm from '../pages/customerForm'
import CustomersTable from '../pages/customersTable'
import BalanceForm from './balanceForm'
import Home from './Home'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/customers/add' element={<CustomerForm/>}/>  
      <Route path='/customers/add/:id' element={<CustomerForm/>}/>  
      <Route path='/customers' element={<CustomersTable/>}/>
      <Route path='/balances/add' element={<BalanceForm/>}/>
      <Route path='/balances/add/:id' element={<BalanceForm/>}/>
      <Route path='/balances/' element={<BalanceTable/>}/>
    </Routes>
  )
}

export default Pages
