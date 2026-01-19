import React from 'react';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className = "min-h-screen" }: LoadingProps) {
  return (
    <div className={`${className} flex items-center justify-center bg-background`} role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
