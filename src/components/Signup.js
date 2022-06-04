import { keyboard } from '@testing-library/user-event/dist/keyboard'
import React , {useEffect, useState} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validate} from './validate.js'
import { notify } from './toast';
import './signup.css'

export default function Signup() {

  const [data, setData] = useState({
    name : "" ,
    email : "" ,
    password : "" ,
    confirmPassword : "" ,
    isAccepted : false
  })

  const focusHandler = event => {
     setTouched({ ...touched, [event.target.name] : true})
  }

  const [errors, setErrors] = useState({}) ;
  const [touched, setTouched] = useState({}) ;

  useEffect(() => {
    setErrors(validate(data))
    console.log(errors)
  }, [data] )
  
  const changeHandler = event => {
    if (event.target.name === "isAccepted") 
    {
      setData({...data , [event.target.name] : event.target.checked})
    } else {
      setData({...data, [event.target.name] : event.target.value})
    }
    console.log(data)

  }

  const submitHandler = event => {
    event.preventDefault()
    if (!Object.keys(errors).length) {
      console.log(data)
      notify('success',"Your verify successfully")

    } else {
      notify('error','Enter the complete information')
      setTouched ( {
       name : true , 
       email : true ,
       isAccepted : true ,
       confirmPassword : true ,
       password : true
      })
    }
  }


  return (
    <div className='container'>
      <form onSubmit={submitHandler} className='formContainer' >
         <h1 className='header'>Signup</h1>
         <div className='formField'>
           <label>Name</label>
           <input 
           className={ (errors.name && touched.name) ? 'uncompleted': 'formInput' }
           type="text" 
           name='name' 
           value={data.name} 
           onChange={changeHandler} 
           onFocus={focusHandler}  
            />
           { errors.name && touched.name && <span>{errors.name}</span> }
         </div>
         <div className='formField'>
           <label>Email</label>
           <input 
           className={ (errors.email && touched.email) ? 'uncompleted': 'formInput' }
           type="text" 
           name='email' 
           value={data.email} 
           onChange={changeHandler} 
           onFocus={focusHandler} />
           { errors.email && touched.email && <span>{errors.email}</span> }
         </div>
         <div className='formField'>
           <label>Password</label>
           <input 
           className={ (errors.password && touched.password) ? 'uncompleted': 'formInput' }
           type="password" 
           name='password' 
           value={data.password} 
           onChange={changeHandler} 
           onFocus={focusHandler} />
           { errors.password && touched.password && <span>{errors.password}</span> }
         </div>
         <div className='formField'>
           <label>Confirm Password</label>
           <input 
           className={ (errors.confirmPassword && touched.confirmPassword) ? 'uncompleted': 'formInput' }
           type="password" 
           name='confirmPassword' 
           value={data.confirmPassword} 
           onChange={changeHandler} 
           onFocus={focusHandler} />
           { errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span> }
         </div>
         
         <div className='formField'>
          <div className='checkBoxContainer'>
           <label>I accept term of privacy policy</label>
           <input 
           type="checkbox" 
           name='isAccepted' 
           value={data.isAccepted} 
           onChange={changeHandler} 
           onFocus={focusHandler} />
           </div>
           { errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span> }
         </div>
         <div className='formButtons'>
           <a href="#">Login</a>
           <button type='submit'>Sign Up</button>
         </div>
      </form>
      <ToastContainer />
    </div>
    
     
  )
}
