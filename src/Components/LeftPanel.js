import React from 'react';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LeftPanel.css';
import {auth} from '../utils/Firebase' ;
import { signOut } from "firebase/auth";
import {ReactComponent as User} from '../Assets/user.svg';
import {ReactComponent as Logout} from '../Assets/logout.svg';
import {ReactComponent as Home} from '../Assets/home.svg';
import {ReactComponent as Video} from '../Assets/film-reel.svg';

const LeftPanel = () => {

    const navigate = useNavigate();
    const watchlistValues = useSelector((state) => state.watchlist.watchlistArray); 
    const user = useSelector((state) => state.user?.displayName);
    const userName = user ? user : 'Guest'
    const handleWatchList = () =>{
      navigate('/watchlist');
    }
    const handleHome =() =>{
        navigate('/browse')
    }
     const playlistDefaultName = useSelector((state) => state.watchlist.defaultName)

     const handleSignOut = () =>{   
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate('/')
        }).catch((error) => {
          // An error happened.
        });
      }
    
  
    return (
    <div className='playlistContainer'>
          <h1 className='leftPanelHeading'>Watchlists</h1>
          <button className="home-button" onClick={handleHome}>
            <Home className='homeSVG' /> 
            <p> Home </p>
          </button>
          <h4>My Lists </h4>

          {watchlistValues.length > 0 ? (
            <div>
              <button className="watchlist-button" onClick={handleWatchList}>
                <Video className='videoSVG' /> 
                <p> {playlistDefaultName} </p>
                <span>{watchlistValues.length}</span>
            </button>

            </div>
            
          ) : ''}
          <div className='userContainer'>
            <User className='userSVG'/>
            <p>{userName}</p>
            <button onClick={handleSignOut}><Logout className='logoutSVG' /></button>
          </div>
        

        </div>
  )
}

export default LeftPanel