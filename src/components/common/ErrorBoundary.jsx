import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("ErrorBoundary caught:", error, info); }
  render() {
    if (this.state.hasError) {
      return <div className="p-6 bg-red-50 rounded">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}
