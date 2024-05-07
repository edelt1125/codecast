"use client"
import React from 'react';
import  VotingComponent  from "./VotingComponent";
import DiscussionComponent from "./DiscussionComponent";

const CommunityPage = () => {
    return (
      <div className="bg-gray-900 min-h-screen px-10 py-8 mx-auto">
        <h1 className="text-white font-bold text-xl">Community Page</h1>
        <div className='justify-center mt-10 space-y-6'>
          <VotingComponent/>
          <DiscussionComponent/>
        </div>
      </div>
    );
  };

export default CommunityPage;