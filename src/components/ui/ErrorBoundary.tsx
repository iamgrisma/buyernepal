import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BuyerNepal UI Error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="store-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="store-empty error-state" style={{ maxWidth: '520px', width: '100%', margin: 'auto' }}>
            <div className="empty-icon" style={{ background: '#fee2e2', color: '#e11d48' }}>!</div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Something went wrong</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px', lineHeight: 1.6 }}>
              The page encountered an unexpected issue while rendering. Please reload to restore the session.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="primary-action"
                onClick={() => window.location.reload()}
                style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Reload Page
              </button>
              <a
                href="/"
                className="secondary-action"
                style={{ padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                Go to Home
              </a>
            </div>
            {this.state.error?.message && (
              <details style={{ marginTop: '24px', textAlign: 'left', background: '#f9fafb', padding: '12px', borderRadius: '8px', fontSize: '11px', color: '#9ca3af' }}>
                <summary style={{ cursor: 'pointer', outline: 'none' }}>Technical details</summary>
                <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{this.state.error.message}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
