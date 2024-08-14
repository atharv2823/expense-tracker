import React, { useEffect, useState } from 'react'
import "./Home.css"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import TransactionCard from '../../components/TransactionCard/TransactionCard.js'
import ImgAdd from "./add-wallet.png"
import { Link } from 'react-router-dom'

function Home() {

  const [user, setUser] = useState('')

  const [transactions, setTransactions] = useState([])

  const [netIncom, setNetIncome] = useState(0)
  const [netExpense, setNetExpense] = useState(0)


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }
  }, [])

  const loadTransaction = async () => {
    if (!user._id) {
      return
    }

    toast.loading('loading Transactions...')

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transaction?userId=${user._id}`)

    const allTransactions = response.data.data

    toast.dismiss()

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransaction()
  }, [user])


  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else {
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)


  }, [transactions])

  return (
    <div>
      <h1>Hello, {user.fullName} 👋</h1>
      <h2 className='greet'>Welcome To Expense Tracker 📝</h2>


      <span className='Home-logout' onClick={() => {
        localStorage.removeItem('currentUser')
        toast.success('Logged Out Successfully')
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }}>LogOut</span>

      <div className='net-transaction-value'>
        <div className='net-transaction-value-iteam'>
          <span className='net-transaction-value-amount'>
            +{netIncom}
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>


        <div className='net-transaction-value-iteam'>
          <span className='net-transaction-value-amount'>
            -{netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Expense
          </span>
        </div>


        <div className='net-transaction-value-iteam'>
          <span className='net-transaction-value-amount'>
            {netIncom - netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>

      </div>

      <div className='transaction-container'>

        {
          transactions.map((transaction) => {

            const { _id, title, amount, category, type, createdAt } = transaction



            return (<TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransaction={loadTransaction}

            />)
          })

        }

      </div>
        <Link to='/add-transaction' >
      <img src={ImgAdd} alt='add TRansaction' className='add-transaction'/>
      </Link>

      <Toaster />
    </div>
  )
}

export default Home