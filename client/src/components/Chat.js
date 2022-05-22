import React, { useState } from 'react'
import axios from 'axios';
import './../scss/chat.scss';
import Contacts from './Contacts';
import ChatRoom from './ChatRoom';
import { useNavigate } from 'react-router-dom';
import { getContactListRoute } from '../utils/APIRoutes';
export default function Chat() {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useState(function() {
    if(!localStorage.getItem('chatter-box-user')) {
      navigate('/login');
    }
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem('chatter-box-user'));
    if(!user.isAvatarSet) navigate('/setAvatar');
    setCurrentUser(user);
    const fetchContactList = async function() {
      try {
        const { data } = await axios.get(`${getContactListRoute}/${user._id}`, {
            headers: {'Authorization': localStorage.getItem('chatter-box-token')},
          }
        )
        setContactList(data.users);
      }
      catch(e) {
        // show toast msg to refresh
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchContactList();
  }, []);

  return (
    <div className="chat__container">
    {
      isLoading ?
      <img src="/gif/7Mpw.gif" alt="loader"></img> :
      <div className="container">
        <Contacts 
          contacts={contactList} 
          currentUser={currentUser}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
        <ChatRoom />
      </div>
    }
    </div>
  )
}
