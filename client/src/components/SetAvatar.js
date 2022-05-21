import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Buffer } from 'buffer';
import { Toast, ToastContainer } from 'react-bootstrap';
import { setAvatarRoute  } from '../utils/APIRoutes'; 
import './../scss/avatar.scss';
import { useNavigate } from 'react-router-dom';

export default function SetAvatar() {
  const avatarApi = 'https://api.multiavatar.com/'
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [avatarList, setAvatarList] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    msg: ''
  });
  const navigate = useNavigate();
  useEffect(function() {
    let list = [];
    const fetchList = async function() {
      let promiseArr = [];
      for(let i=0; i<5;i++) {
        let randN = Math.ceil(Math.random() * 100000);
        promiseArr.push(axios.get(avatarApi + randN, { responseType: 'arraybuffer' })) 
      }
      list = await Promise.all(promiseArr);
      let data = list.map(item => {
        let imageBuffer = new Buffer(item.data);
        return imageBuffer.toString('base64');
      });
      setAvatarList(data);
      setIsLoading(false);
    }
    fetchList();
  }, []);

  const handleClick = async function() {
    if(!selectedAvatar) {
      setToast({...toast, 
        show: true,
        msg: 'Please select an avatar.!'
      });
    } else {
      let selectedAvatarImg = avatarList[selectedAvatar];
      setIsLoading(true);
      try {
        let id = JSON.parse(localStorage.getItem('chatter-box-user'))._id;
        let token = localStorage.getItem('chatter-box-token');
        await axios.patch(`${setAvatarRoute}/${id}`, 
            { avatar: selectedAvatarImg },
            { 
              headers: {'Authorization': token, 'Content-type': 'arraybuffer' }, 
            }
          );
          navigate('/');
      }
      catch(e) {
        setToast({...toast, 
          show: true, msg: 'Inernal Server Error.!'
        });
      }
      finally {
        setIsLoading(false);
      }

    }
  }

  return (
    <div className='main__container'>
      {
        isLoading ?
          <img src="/gif/7Mpw.gif" alt="loader"></img> : 
            <div className='container'>
              <div className='title'>Pick an avatar as your profile picture</div>
              <div className='avatars__container'>
                {
                  avatarList.map((avatar, index) => {
                    return (
                      <span 
                        className={index == selectedAvatar ? 'avatar selected' : 'avatar'} 
                        key={index}
                        onClick={() => setSelectedAvatar(index)}
                      >
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                      </span>
                    );
                  })
                }
              </div>
              <button className='submit__btn' onClick={handleClick}>Set Avatar</button>
            </div>
      }  
      <ToastContainer position="bottom-end" >
        <Toast 
          onClose={() => setToast({...toast, show: false})} 
          show={toast.show} 
          delay={2000}
          autohide
          >
          <Toast.Header>
            <strong className="me-auto" style={{color: 'red', fontSize: '16px'}}>Error</strong>
          </Toast.Header>
          <Toast.Body className="toast-body">{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}
