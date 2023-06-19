import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  // this lifecycle method is called when an error is thrown in a child component
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  // this lifecycle method is called when an error is thrown in a child component
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary