import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link';

const DiscussionComponent = () => {

  const { isLoaded, user } = useUser();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/commentsAPI', { cache: 'no-store' });
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, []);

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    console.log(newComment, user.id);

    if (newComment.trim() !== '') {
      try {
        const now = new Date();
        const currentDateTime = now.toLocaleString();
        // Prepare the body content
        const requestBody = JSON.stringify({
          text: newComment,
          userId: user.id,
          timestamp: currentDateTime
        });
        
        // Log the body content
        console.log('Sending POST request with body:', requestBody);

        const response = await fetch('/api/postComment', { cache: 'no-store' },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        });
        const data = await response.json(); 
        if (response.ok) {
          setComments(prevComments => [data, ...prevComments]); 
          setNewComment('');
        } else {
          throw new Error(data.message || 'Failed to submit comment');
        }
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
};

  return (
    <div>
      <h2 className='text-white'>Discussion Forum</h2>
      <textarea
        style={{ width: '100%' }}
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Type your comment here"
      />
      <button className="text-white flex rounded-lg bg-blue-500 hover:bg-blue-700 px-4" onClick={handleSubmitComment}>
        Submit Comment
      </button>
      <h2 className='text-white font-bold text-lg my-6'>Forum:</h2>
      <ul className='text-white font-thin my-4 space-y-4'>
        {comments.map((comment, index) => (
          <div key={index} className='border rounded-sm w-fit h-16 flex items-center'>
            <li className='mx-2 flex justify-center items-center'>
              <Link href={`/${user.username}`}><button className='border-[3px] rounded-full border-blue-400'><img src={user.imageUrl} width={30} height={30} className='rounded-full' /></button></Link>
              <span className='mx-2'>{user.fullName} - {comment.text}</span> <span className="text-gray-400"> on {comment.timestamp}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionComponent;
