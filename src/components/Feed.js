import React, { useState } from 'react'
import FeedPost from './FeedPost'
import PostModal from './ui/post-modal'

export default function Feed() {
  const [isPostExpression,setIsPostExpression]=useState(false)
  const toggleCreateExpression=()=>{
    setIsPostExpression(!isPostExpression)
    console.log(isPostExpression)
  }
  return (
    <>
      <div className='feed'>
        <div className='button-container'>
          <button onClick={toggleCreateExpression} className='write-button'>Write</button>
        </div>
        <div className='feed-posts'>
              <FeedPost/>
              <FeedPost/>
              <FeedPost/>
        </div>
      </div>
      {isPostExpression && <PostModal toggleCreateExpression={toggleCreateExpression}/>}
   </>
  )
}
