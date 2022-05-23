import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './../scss/chat.scss';
import { useNavigate } from 'react-router-dom';
import { getContactListRoute } from '../utils/APIRoutes';
import Contacts from './Contacts';
import ChatRoom from './ChatRoom';
export default function Chat() {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(function() {
    const fetchContactList = async function() {
      let user = await localStorage.getItem('chatter-box-user');
      if(!user) {
        navigate('/login');
      } else if(!JSON.parse(user)?.isAvatarSet) {
        navigate('/setAvatar');
      } else {
        user = JSON.parse(user);
        setIsLoading(true);
        setCurrentUser(user);
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
    }
    fetchContactList();
  }, []);

  return (
    <div className="chat__container">
    {
      isLoading ?
      <img src="/gif/7Mpw.gif" alt="loader"></img> :
      <div className="main__chat__container">
        <Contacts 
          contacts={contactList} 
          currentUser={currentUser}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
        <ChatRoom selectedContact={selectedContact}/>
      </div>
    }
    </div>
  )
}
