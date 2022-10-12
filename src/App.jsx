
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'


const baseURL = 'http://144.126.218.162:9000/swagger'

function App() {

  //primero haremos un get, y como lo usaremos varias veces lo metemos dentro de una funcion
  const [users, setusers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setFormIsClose] = useState(true)

  const getAllUsers = () => {
    const URL =`${baseURL}/users/`
    axios.get(URL)
      .then(res => setusers(res.data))
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getAllUsers()  
    
  }, [])

  const createNewUser = (data) => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }
  
 const deleteUserById =  (id) =>{
  const URL= `${baseURL}/users/${id}/`
  axios.delete(URL)
    .then (res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))

 }

 //para actualizar un usuario
 const updateUserById =(id, data) =>{
  const URL=`${baseURL}/users/${id}/`
  axios.patch(URL, data)
     .then(res => {
    console.log(res.data)
     getAllUsers()
    }).catch(error => {
      console.log(res.data);
      setError(error);
    }); 
    
 }
 const handleOpenForm = () => {
  setFormIsClose(false)
 }
 
  return (
    <div className="App">
      <div className='app__container-title'>
          <h1 className='app_title'>Users CRUD</h1>
          <button onClick={handleOpenForm} className='app__btn'>Create a New User</button>
      </div>
   
      <div className={`form__container ${formIsClose && 'form__disable'}`}>
        <FormUsers 
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
        />
      </div>
     
      <div className='users__container'>
      {
        users?.map(user =>(
          <UserCard 
          key={user.id}
          user={user}
          deleteUserById={deleteUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
          />
        ))
      }
      </div>
     
    </div>
  )
}

export default App
