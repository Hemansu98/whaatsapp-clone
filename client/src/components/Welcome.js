import React from 'react'

export default function Welcome() {
  return (
    <div className='welcome__container'>
        <img src="/gif/welcome-16.gif" alt="welcome" />
        <div className='msg' style={{color: '#E04D01', fontSize: '32px', fontFamily: 'monospace'}}>PLEASE SELECT A CONTACT TO CHAT.!</div>
    </div>
  )
}
