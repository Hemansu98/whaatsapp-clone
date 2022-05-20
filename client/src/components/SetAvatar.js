import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Buffer } from 'buffer';
import './../scss/avatar.scss';

export default function SetAvatar() {
  const avatarApi = 'https://api.multiavatar.com/'
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [avatarList, setAvatarList] = useState([]);

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

  const handleClick =  function() {
    if(!selectedAvatar) {
      // show msg
    } else {
      // update avatar in backend
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

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
    </div>
  )
}
