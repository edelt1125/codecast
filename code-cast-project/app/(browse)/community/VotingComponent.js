import React, { useState } from 'react';

const VotingComponent = () => {
  const [votes, setVotes] = useState({
    topic1: 0,
    topic2: 0,
    topic3: 0,
  });

  const handleVote = (topic) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [topic]: prevVotes[topic] + 1,
    }));
  };

  return (
    <div className="text-white font-thin space-y-6">
      <h2>Topics To Vote For:</h2>
      <ul className='space-y-2'>
        <li className='border rounded-sm w-fit'>
          <div className='mx-4'>
            Topic 1: {votes.topic1}
            <button onClick={() => handleVote('topic1')}>Vote</button>
          </div> 
        </li>
        <li className='border rounded-sm w-fit'>
        <div className='mx-4'>
          Topic 2: {votes.topic2}
          <button onClick={() => handleVote('topic2')}>Vote</button>
        </div>
        </li>
        <li className='border rounded-sm w-fit'>
        <div className='mx-4'>
          Topic 3: {votes.topic3}
          <button onClick={() => handleVote('topic3')}>Vote</button>
        </div>
        </li>
      </ul>
    </div>
  );
};

export default VotingComponent;