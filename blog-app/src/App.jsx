import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true); // are we  fetching the datat from appwrite
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.isuserLoggedIn()
          .then((data)=>{ // datat will be 
            console.log("is user logged in: ", data)
            if (data){
              dispatch(login({userData: data}))
            }
            else{
              dispatch(logout()) // we are calling logout so that our app's state is updated on all tasks.
            }
          })
          .finally(()=> setLoading(false)) // as loading is completed
  }, [])


  return ((loading) ? (<div>Hi Raj, still loading the data</div>) : (<div>Hi Raj, data is loaded</div>))

  /*
  <Header></Header>
  <main> {outlet}</main>    --> we will handle this in this way
  <Footer></Footer>

  */
}

export default App
