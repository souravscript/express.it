import React from 'react'
import FeedPost from './FeedPost'

export default function Feed() {
  return (
    <div className='feed'>
      Feed
      <div className='button-container'>
        <button className='write-button'>Write</button>
      </div>
      <div className='feed-posts'>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
      </div>
    </div>
  )
}
