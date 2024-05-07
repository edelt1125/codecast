"use client";

import { useEffect, useState, useRef } from 'react';
import { useUser } from "@clerk/nextjs";
import { LiveKitRoom, GridLayout, ParticipantTile, useTracks, LayoutContextProvider, ConnectionState } from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { VideoConference } from "@livekit/components-react";


export default function LiveKitStream({ room, style, isLive }) {
  const { user, isSignedIn } = useUser();
  const [token, setToken] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false); // State to track fullscreen mode
  const videoRef = useRef(null); // Ref for the streaming div


  // Dynamically adjust styles based on fullscreen state
  const videoStyle = {
    display: 'flex',
    flex: 1,
    width: isFullscreen ? '100vw' : 'auto', // Fullscreen width
    height: isFullscreen ? '85vh' : 'auto', // Fullscreen height
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? 0 : 'auto',
    left: isFullscreen ? 0 : 'auto',
    zIndex: isFullscreen ? 1000 : 'auto'
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true); // Set fullscreen state to true
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false); // Set fullscreen state to false
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullscreen = document.fullscreenElement != null;
      setIsFullscreen(isCurrentlyFullscreen);
    };
  
    document.addEventListener('fullscreenchange', handleFullScreenChange);
  
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);
  

  useEffect(() => {
    const username = user?.username || "quickstart-user";
   
    (async () => {
      try {
        const resp = await fetch(`/api/livekit/get-participant-token?room=${room}&username=${username}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [isSignedIn, user?.username, room, isLive]);

  if (!isLive) {
    return (
      <div style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', color: "darkgray" }}>
        <img src="https://via.placeholder.com/800x450.png?text=Stream+Offline" alt="Stream Offline" />
      </div>
    );
  }

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <LayoutContextProvider>
      <div ref={videoRef} className='flex mr-56'>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        data-lk-theme="default"
        style={isFullscreen ? videoStyle : {...style, display: 'flex', flex: 1}}
      >
        <div className="flex-grow">
         <VideoConference/>
         <ConnectionState/>
          <button onClick={toggleFullScreen}>Toggle Fullscreen</button>
        </div>
      </LiveKitRoom>
      </div>
    </LayoutContextProvider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: '100%' }}>
      <ParticipantTile />
    </GridLayout>
  );
}
