import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorStr?: string;
}

export class ErrorBoundary extends React.Component<any, any> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorStr: error.toString() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if ((this as any).props.fallback) return (this as any).props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-red-50 text-red-800 p-6 border-2 border-red-500 rounded">
          <h2 className="text-xl font-bold mb-4">Ups! Aplikasi Mengalami Gangguan (Crash)</h2>
          <p className="mb-4">Fitur ini mengalami kesalahan mendadak.</p>
          <pre className="text-xs bg-white p-4 border border-red-300 w-full overflow-auto max-w-2xl">{this.state.errorStr}</pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-700"
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
