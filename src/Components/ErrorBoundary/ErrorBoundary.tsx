import React from 'react'

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) return <span>Error occurred</span>

    return this.props.children
  }
}
