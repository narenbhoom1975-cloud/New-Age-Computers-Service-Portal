import React from 'react';
import { ServiceResponse } from '../types';

interface SuccessViewProps {
  data: ServiceResponse;
  onReset: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ data, onReset }) => {
  const recipientEmail = "narenbhoom1975@gmail.com";
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(data.emailSubject)}&body=${encodeURIComponent(data.emailBody)}`;

  const recipientMobile = "919920524542";
  const whatsappLink = `https://wa.me/${recipientMobile}?text=${encodeURIComponent(data.whatsappMessage)}`;

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded shadow-sm flex justify-between items-center">
        <div>
          <p className="font-bold">Complaint Recorded Successfully</p>
          <p className="text-sm">Ticket #{data.ticketNumber} generated.</p>
        </div>
        <div className="bg-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Backend Automation Simulation */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">INTERNAL SYSTEM</span>
            <h3 className="text-lg font-bold text-slate-700">Automated Email Dispatch</h3>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">N</div>
                 <div className="text-sm">
                   <p className="font-semibold text-slate-800">To: {recipientEmail}</p>
                   <p className="text-slate-500 text-xs">From: Automated Client Portal</p>
                 </div>
               </div>
               <span className="text-xs text-slate-400">Just now</span>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">{data.emailSubject}</h4>
              <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed font-sans">
                {data.emailBody}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                 <span className={`text-xs px-2 py-1 rounded font-medium ${
                   data.priorityLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                   data.priorityLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                   'bg-blue-100 text-blue-800'
                 }`}>Priority: {data.priorityLevel}</span>
                 <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium">Auto-Transcribed</span>
              </div>
            </div>
            {/* Email Action Bar */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
                <a 
                  href={mailtoLink}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send to Gmail
                </a>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Transcript</h4>
            <p className="text-slate-600 italic text-sm">"{data.transcription}"</p>
          </div>
        </div>

        {/* Client Notification Simulation */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">CLIENT SIDE</span>
            <h3 className="text-lg font-bold text-slate-700">Automated WhatsApp Reply</h3>
          </div>

          <div className="bg-[#E5DDD5] rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
             {/* WhatsApp Header */}
             <div className="bg-[#075E54] p-3 flex items-center space-x-3 text-white">
                <div className="h-8 w-8 bg-slate-200 rounded-full overflow-hidden">
                  <img src="https://picsum.photos/100/100" alt="Avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">New Age Computers</p>
                  <p className="text-[10px] opacity-80">Business Account</p>
                </div>
             </div>

             {/* WhatsApp Message Area */}
             <div className="p-4 flex flex-col space-y-4 min-h-[300px]">
                <div className="bg-white p-3 rounded-lg shadow-sm rounded-tl-none self-start max-w-[85%] text-sm text-slate-800 relative">
                  <p className="whitespace-pre-line">{data.whatsappMessage}</p>
                  <div className="text-[10px] text-slate-400 text-right mt-1 flex justify-end items-center gap-1">
                    <span>Now</span>
                  </div>
                </div>
             </div>
             
             {/* Background Pattern Overlay */}
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>

             {/* WhatsApp Action Bar */}
             <div className="bg-[#f0f2f5] px-6 py-3 border-t border-slate-200 flex justify-end relative z-10">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.351-5.298c0-5.457 4.432-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Send to Naren (WhatsApp)
                </a>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg shadow-md hover:bg-slate-800 transition-colors"
        >
          Record Another Complaint
        </button>
      </div>
    </div>
  );
};

export default SuccessView;