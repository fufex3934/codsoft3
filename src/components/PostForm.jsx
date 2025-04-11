import React, { useState } from 'react'

export default function PostForm() {
    const [title,setTitle ] = useState("");
    const [content,setContent] = useState("");
  return (
    <form>
        <input type="text"
        placeholder='Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
         />
         <textarea 
         value={content}
         placeholder='Content'
         onChange={(e)=>setContent(e.target.value)}
         />
         <button type='submit'>Post</button>
    </form>
  )
}
