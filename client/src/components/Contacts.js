import React from 'react'
import './../scss/contacts.scss';
export default function Contacts({ contacts, currentUser, selectedContact, setSelectedContact }) {    
  return (
    <div className="contact__container">
        <div className="header">
            ChatterBox
        </div>
        <div className="list__container">
        {
            contacts.map((item, index) => {
                return (
                    <div 
                        className={selectedContact?._id == item._id ? 'contact selected' : 'contact'} 
                        key={item._id}
                        onClick={() => setSelectedContact(item)}
                        >
                        <img 
                            className='avatar__img'
                            src={`data:image/svg+xml;base64,${item.avatar}`}  />
                        <span>{item.username}</span>
                    </div>
                )
            })
        }
        </div>
        <div className='footer'>
            <span>{currentUser.username}</span>
            <img 
                className='avatar__img'
                src={`data:image/svg+xml;base64,${currentUser.avatar}`} />
        </div>
    </div>
  )
}
