
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'


const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  //primero haremos un get, y como lo usaremos varias veces lo metemos dentro de una funcion
  const [users, setusers] = useState()
  const [updateInfo, setUpdateInfo] = useState()

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

  return (
    <div className="App">
      <h1>Users CRUD</h1>
      <div className='form__container'>
        <FormUsers 
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
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
          />
        ))
      }
      </div>
     
    </div>
  )
}

export default App
