import React, { useState, useEffect } from 'react';

const VotingComponent = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
        const response = await fetch(`/api/fetchTopics`);
        const data = await response.json();
        setTopics(data);
    }

    fetchTopics();
}, []);


  const handleVote = async (id) => {
      await fetch('/api/voteTopic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(response => response.json())
      .then(updatedTopic => {
        setTopics(prev => prev.map(topic => topic.id === id ? updatedTopic : topic));
      })
      .catch(error => console.error('Error updating vote:', error));
  };

  return (
    <div className="text-white font-thin space-y-6">
      <h2>Topics To Vote For:</h2>
      <ul className='space-y-2'>
        {topics.map((topic) => (
          <li key={topic.id} className='border rounded-sm w-fit'>
            <div className='mx-4 my-2 flex'>
              {topic.name}: {topic.votes}
              <button className="ml-2 border rounded-full hover:bg-blue-400" onClick={() => handleVote(topic.id)}><img src="/pics/vote.svg" width={20} height={20}></img></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingComponent;