import React from 'react'
import WelcomeComp from './Welcome';
import Room from './Room';
import {Person ,Power} from 'react-bootstrap-icons';
import './../scss/chatRoom.scss';
import { useNavigate } from 'react-router-dom';
export default function ChatRoom({selectedContact}) {
  const navigate = useNavigate();
  const signOut = function() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className='chatRoom__container'>
      <div className={`header__section ${!selectedContact ? 'float-right' : ''}`}>
      {
        selectedContact &&
        <div>
          <img src={`data:image/svg+xml;base64,${selectedContact.avatar}`} />
          <span className='username'>{selectedContact.username}</span>  
        </div>
      }
        <Power 
          className='power__icon' 
          size={22}
          onClick={() => signOut()}
        />
      </div>
      <div className="main__section">
      {
        selectedContact ? 
          <Room /> :
          <WelcomeComp />
      }
      </div>
    </div>
  )
}
