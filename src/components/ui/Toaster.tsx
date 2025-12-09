import { useEffect, useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const toasts: Toast[] = [];
const listeners: Set<() => void> = new Set();

export function toast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const id = Math.random().toString(36).substring(2);
  toasts.push({ id, message, type });
  listeners.forEach((listener) => listener());
  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
      listeners.forEach((listener) => listener());
    }
  }, 4000);
}

export function Toaster() {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const listener = () => setUpdate((u) => u + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all animate-in slide-in-from-right ${
            t.type === 'success'
              ? 'bg-success text-success-foreground'
              : t.type === 'error'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
