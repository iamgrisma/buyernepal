import React from 'react';

interface LoadingProps {
  className?: string;
  fullScreen?: boolean;
}

export default function Loading({ className = '', fullScreen = true }: LoadingProps) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center bg-background"
    : "flex items-center justify-center w-full h-full";

  return (
    <div
      className={`${containerClass} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
