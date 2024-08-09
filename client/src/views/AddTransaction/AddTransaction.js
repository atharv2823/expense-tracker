import React, { useState ,useEffect } from 'react'
import "./AddTransaction.css"
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'

function AddTransaction() {

    const [user,setUser] = useState('')
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState('')
    const [type,setType] = useState('credit')
    const [category,setCategory] = useState('Learning')


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
        if (currentUser) {
          setUser(currentUser)
        }
    
        if (!currentUser) {
          window.location.href = '/login'
        }
      }, [])

      const addTransaction = async ()=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/transaction`,{
            user:user._id,
            title:title,
            amount:amount,
            type:type,
            category:category

        })

        toast.success(response.data.message)

        setTitle('')
        setAmount('')
        setType('credit')
        setCategory('Learning')

        setTimeout(()=>{
            window.location.href = '/ '
        })
      }



  return (
    <div>
        <h1 className='add-transaction-title'>Add Transaction for {user.fullName}</h1>


        <form className='auth-form'>
            <input
            type='text'
            placeholder='Title'
            className='User-input'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />

            <input
            type='number'
            placeholder='Amount'
            className='User-input'
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            />

           <select className='User-input' 
           value={type} 
           onChange={(e)=>setType(e.target.value)}
           >
            <option value="credit">Income</option>
            <option value="debit">Expense</option>
           </select>

           <select className='User-input' 
           value={category} 
           onChange={(e)=>setCategory(e.target.value)}
           >

            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="leraning">Learning</option>
            <option value="others">Others</option>

            </select>

            <button type='button' className='btn-auth' onClick={addTransaction}>Add Transaction</button>
        </form>
        <Toaster/>
    </div>
  )
}

export default AddTransaction