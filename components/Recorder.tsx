import React, { useState, useRef, useEffect } from 'react';
import { AudioRecording } from '../types';

interface RecorderProps {
  onRecordingComplete: (recording: AudioRecording) => void;
  onCancel: () => void;
}

const Recorder: React.FC<RecorderProps> = ({ onRecordingComplete, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    startRecording();
    return () => {
      stopRecordingCleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);
        onRecordingComplete({ blob, url });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      onCancel();
    }
  };

  const stopRecordingCleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleStopClick = () => {
    stopRecordingCleanup();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500 rounded-full pulse-ring opacity-75"></div>
        <div className="relative bg-red-500 text-white p-6 rounded-full shadow-lg z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Listening...</h2>
      <p className="text-slate-500 mb-6 text-center">Describe your computer or network issue clearly.</p>
      
      <div className="text-4xl font-mono font-bold text-slate-700 mb-8">
        {formatTime(duration)}
      </div>

      <button 
        onClick={handleStopClick}
        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
      >
        Stop & Submit
      </button>
      
      <button 
        onClick={onCancel}
        className="mt-4 text-slate-400 hover:text-red-500 text-sm font-medium"
      >
        Cancel
      </button>
    </div>
  );
};

export default Recorder;