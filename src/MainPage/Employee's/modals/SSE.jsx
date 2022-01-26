import React from 'react';
import { useSSE, SSEProvider } from 'react-hooks-sse';

const Comments = () => {
  const state = useSSE('comments', {
    count: null
  });

  return state.count ? state.count : '...';
};

const App = () => (
   
  <SSEProvider endpoint={`http://localhost:8000/devices/c69046c3-163c-4295-9aad-f3ee203acd36/stream`}>
    <h1>Subscribe & update to SSE event</h1>
    <Comments />
  </SSEProvider>
);