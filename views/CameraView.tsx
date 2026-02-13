
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { recognizeObject } from '../services/geminiService';
import { RecognitionResult, HistoryItem } from '../types';

interface CameraViewProps {
  onClose: () => void;
  onSaveScan: (item: HistoryItem) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onClose, onSaveScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera permission denied or not available.");
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const takeScan = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsScanning(true);
    setResult(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    const recognition = await recognizeObject(base64Image);
    if (recognition) {
      setResult(recognition);
      onSaveScan({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        image: canvas.toDataURL('image/jpeg'),
        data: recognition
      });
    } else {
      setError("Failed to recognize object. Try again!");
    }
    setIsScanning(false);
  }, [onSaveScan]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md text-white">
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="flex gap-2">
          {result && (
            <div className="bg-primary text-background-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
          <div className="w-full h-full border-2 border-primary/30 rounded-3xl relative">
             {/* Bounding Box Corner Brackets */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
          </div>
        </div>

        {result && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-5 bg-background-dark/90 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="border-b border-primary/10 pb-3 mb-3">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest">Object Detected</span>
              <h3 className="text-xl font-bold">{result.objectName}</h3>
            </div>
            <div className="space-y-3">
              <TranslationRow lang="FR" text={result.translations.fr} />
              <TranslationRow lang="ZH" text={result.translations.zh} />
              <TranslationRow lang="EN" text={result.translations.en} />
            </div>
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-primary font-black uppercase tracking-widest animate-pulse">Analyzing Surroundings...</p>
          </div>
        )}
      </div>

      <div className="bg-background-dark p-10 flex items-center justify-center gap-12 border-t border-primary/10">
        <button className="text-slate-500 hover:text-white transition-colors">
          <span className="material-icons text-3xl">flash_off</span>
        </button>
        <button 
          onClick={takeScan}
          disabled={isScanning}
          className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-background-dark shadow-2xl shadow-primary/30 transform active:scale-90 transition-all disabled:opacity-50"
        >
          <span className="material-icons text-4xl font-bold">photo_camera</span>
        </button>
        <button className="text-slate-500 hover:text-white transition-colors">
          <span className="material-icons text-3xl">image</span>
        </button>
      </div>

      {error && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
};

const TranslationRow = ({ lang, text }: { lang: string; text: string }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-[10px] font-black text-slate-500 w-4">{lang}</span>
    <span className="text-sm font-bold truncate flex-1 text-right">{text}</span>
    <button className="text-primary hover:scale-110 transition-transform">
      <span className="material-icons text-sm">volume_up</span>
    </button>
  </div>
);

export default CameraView;
