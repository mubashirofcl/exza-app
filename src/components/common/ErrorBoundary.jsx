import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="my-36  p-6 bg-red-50 rounded">
          <h2 className="text-lg font-semibold text-red-700">Something went wrong.</h2>
          <p className="text-sm text-red-600">Please refresh the page or try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
