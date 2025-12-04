import React, { useState } from 'react';
import { AppState, AudioRecording, ServiceResponse } from './types';
import { processAudioComplaint } from './services/geminiService';
import MicrophonePermission from './components/MicrophonePermission';
import Recorder from './components/Recorder';
import SuccessView from './components/SuccessView';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [serviceResponse, setServiceResponse] = useState<ServiceResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startFlow = () => {
    setAppState(AppState.RECORDING);
  };

  const handlePermissionGranted = () => {
    setAppState(AppState.RECORDING);
  };

  const handleRecordingComplete = async (recording: AudioRecording) => {
    setAppState(AppState.PROCESSING);
    try {
      const result = await processAudioComplaint(recording.blob);
      setServiceResponse(result);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to process the recording. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.IDLE);
    setServiceResponse(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-auto">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">New Age Computers</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 hidden sm:block">
            Automated Service Portal
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
        
        {/* State: IDLE */}
        {appState === AppState.IDLE && (
          <div className="text-center max-w-2xl animate-fade-in-up">
            <div className="mb-8 inline-block p-4 bg-white rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Hardware Issues? <br className="hidden sm:block" />
              <span className="text-blue-600">Just say it. We'll handle it.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Record a voice message describing your problem. Our AI system will automatically generate a ticket, notify our engineers via email, and confirm your appointment via WhatsApp immediately.
            </p>
            <MicrophonePermission onPermissionGranted={startFlow} />
          </div>
        )}

        {/* State: RECORDING */}
        {appState === AppState.RECORDING && (
          <Recorder 
            onRecordingComplete={handleRecordingComplete} 
            onCancel={resetApp} 
          />
        )}

        {/* State: PROCESSING */}
        {appState === AppState.PROCESSING && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Request</h3>
            <p className="text-slate-500">
              Transcribing audio, generating ticket, and drafting notifications...
            </p>
          </div>
        )}

        {/* State: SUCCESS */}
        {appState === AppState.SUCCESS && serviceResponse && (
          <SuccessView data={serviceResponse} onReset={resetApp} />
        )}

        {/* State: ERROR */}
        {appState === AppState.ERROR && (
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h3>
            <p className="text-slate-600 mb-6">{errorMessage || "An unknown error occurred."}</p>
            <button 
              onClick={resetApp}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} New Age Computers. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;