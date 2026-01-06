import React from 'react';

export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      role="status"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-hidden="true"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
