import React from 'react'

const FeedPost = () => {
  return (
    <div className='post'>
      <div className='profile-info'>
        <div className='profile-name'>
          <div className='profile-img'></div>
          <h5 className='name'>Arjun Redy</h5>
        </div>
        <span className='timestamp'>10 mins ago</span>
      </div>
      <div className='content'>
        <p className='writeup'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br/> 
        eiusmod tempor incididunt ut labore et dolore magna.<br/>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        </p>
        <span className='watermark'></span>
      </div>
    </div>
  )
}

export default FeedPost
