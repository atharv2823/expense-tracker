import React from 'react'
import "./TransactionCard.css"
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'



function TransactionCard({_id , title, amount , type ,category, createdAt}) {

  const deleteTransaction = async () => {

    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)

    toast.success(response.data.message)
    
  }

  return (
    <div className='Transaction-card'>
        <h2>{title}</h2>

        <span className='transcation-card-date'>
            {new Date(createdAt).toLocaleString()}
        </span>

        <span className='transcation-card-category'>
            {category}
        </span>

        <span className='transcation-card-amount' style={{
            color: type === "credit"? "green":"red"
        }}>
            {type === "credit"? "+":"-"}
            {amount}</span>

            <button className='transcation-delete'
            onClick={deleteTransaction}
            >Delete</button>

            <Toaster/>
    </div>
  )
}

export default TransactionCard