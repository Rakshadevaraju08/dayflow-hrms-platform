import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', margin: '20px', fontFamily: 'monospace', zIndex: 9999, position: 'relative' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Frontend Crash Detected!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>Click here to view Error Details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
