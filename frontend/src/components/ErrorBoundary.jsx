import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // Customize this part to render a user-friendly error message.
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>Please try again later, or contact support if the issue persists.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;