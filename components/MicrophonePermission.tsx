import React from 'react';

interface MicrophonePermissionProps {
  onPermissionGranted: () => void;
}

const MicrophonePermission: React.FC<MicrophonePermissionProps> = ({ onPermissionGranted }) => {
  const requestAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop tracks immediately after check
      stream.getTracks().forEach(track => track.stop());
      onPermissionGranted();
    } catch (err) {
      alert("Microphone access is required to record your complaint.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 p-8 text-center bg-white rounded-2xl shadow-lg border border-slate-100 max-w-md w-full">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Microphone Access Needed</h3>
      <p className="text-slate-500 mb-6">Please allow access to your microphone so you can record your service request.</p>
      <button 
        onClick={requestAccess}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        Allow Access
      </button>
    </div>
  );
};

export default MicrophonePermission;