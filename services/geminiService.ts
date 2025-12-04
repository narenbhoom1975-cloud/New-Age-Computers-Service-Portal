import { GoogleGenAI, Type } from "@google/genai";
import { ServiceResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:audio/wav;base64,")
      const base64Content = base64String.split(",")[1];
      resolve(base64Content);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const processAudioComplaint = async (audioBlob: Blob): Promise<ServiceResponse> => {
  try {
    const base64Audio = await blobToBase64(audioBlob);
    const mimeType = audioBlob.type || 'audio/webm'; // Default fallback

    const model = "gemini-2.5-flash";
    
    // Generate a random ticket number for the simulation
    const ticketNum = `NAC-${Math.floor(1000 + Math.random() * 9000)}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Audio
            }
          },
          {
            text: `
              You are the automated service dispatcher for "New Age Computers". 
              A client has recorded a voice message describing a hardware or networking issue.
              
              Your tasks:
              1. Transcribe the audio accurately to English.
              2. Summarize the technical issue.
              3. Determine the priority (Low, Medium, High, Critical).
              4. Compose a professional email notification to the administrator, Naren.
                 - This email will be sent to narenbhoom1975@gmail.com.
                 - Subject should be descriptive and include the Ticket # ${ticketNum}.
                 - Body should be professional and concise.
              5. Compose a polite, automated WhatsApp reply to the client. This reply must:
                 - Confirm receipt of the complaint regarding their [Brief Issue Summary].
                 - State that an engineer will visit by tomorrow.
                 - Include the Ticket Number: ${ticketNum}.
                 - Keep it short, friendly, and helpful.
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            issueSummary: { type: Type.STRING },
            emailSubject: { type: Type.STRING },
            emailBody: { type: Type.STRING },
            whatsappMessage: { type: Type.STRING },
            ticketNumber: { type: Type.STRING },
            priorityLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Critical'] }
          },
          required: ['transcription', 'issueSummary', 'emailSubject', 'emailBody', 'whatsappMessage', 'priorityLevel']
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      // Ensure the injected ticket number is used if the model hallucinated a different one
      return {
        ...data,
        ticketNumber: ticketNum
      };
    } else {
      throw new Error("No response from AI model");
    }

  } catch (error) {
    console.error("Error processing audio complaint:", error);
    throw error;
  }
};