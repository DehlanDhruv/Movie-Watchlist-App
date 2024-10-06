import React , {useEffect , useState} from 'react'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/Firebase' 
import {useDispatch, useSelector} from  'react-redux'
import { addUser , removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
      useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid , email , displayName}= user ;
            dispatch(addUser({uid:uid , email:email , displayName:displayName}))
            navigate('/browse')
            setIsUserSignIn(true)
            
          } 
          else {
            // User is signed out
            dispatch(removeUser())
            navigate('/')
          }
        });
        // unsubscribe is used when component will unmount ,  just a hygiene process
        return () => (unsubscribe());

    } , [])

   
  return (
    <div className='bg-blue-600 w-full'>
      {/* Header */}
    </div>
  )
}

export default Header
    
  


