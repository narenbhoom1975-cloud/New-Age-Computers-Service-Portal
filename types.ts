export interface ServiceResponse {
  transcription: string;
  issueSummary: string;
  emailSubject: string;
  emailBody: string;
  whatsappMessage: string;
  ticketNumber: string;
  priorityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export enum AppState {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AudioRecording {
  blob: Blob;
  url: string;
}