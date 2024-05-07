import React, { useState } from 'react';

const DiscussionComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
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
      <button className="text-white flex rounded-lg bg-red-300 hover:bg-red-500 px-4"onClick={handleSubmitComment}>Submit Comment</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionComponent;