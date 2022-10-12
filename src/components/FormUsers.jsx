import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/FormUsers.css'

const defaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday:''
}



const FormUsers = ({createNewUser,updateInfo,updateUserById,setUpdateInfo}) => {
const {handleSubmit,reset,register} = useForm ()

useEffect(() => {
    if(updateInfo){
        reset(updateInfo)
    }
  
  }, [updateInfo])


const submit = (data) => {
    if(updateInfo){
        //Update
        updateUserById(updateInfo.id, data);
       // createNewUser(data)
        setUpdateInfo()
    }else{
        //Create
        createNewUser(data)
    }
   
    reset(defaultValues)
}
  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
       <i className="form__x fa-solid fa-circle-xmark"></i>
        <h2 className='form__title'>{updateInfo ? 'Edit User' : 'New User'}</h2>
        <div className='form__div'>
            <label className='form__label' htmlFor="email">Email: </label>
            <input type="email" id='email' {...register('email')}/>
        </div>
        <div className='form__div'>
            <label className='form__label' htmlFor="password">Password: </label>
            <input className='form__input' type="password" id='password' {...register('password')}/>
        </div>
        <div className='form__div'>
            <label className='form__label' htmlFor="first_name">First Name: </label>
            <input className='form__input' type="text" id='first_name' {...register('first_name')}/>
        </div>
        <div className='form__div'>
            <label className='form__label' htmlFor="last_name">Last Name: </label>
            <input className='form__input' type="text" id='last_name' {...register('last_name')}/>
        </div>
        <div className='form__div'>
            <label className='form__label' htmlFor="birthday">Birthay: </label>
            <input className='form__input' type="date" id='birthday' {...register('birthday')}/>
        </div>
        <button>{updateInfo ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default FormUsers