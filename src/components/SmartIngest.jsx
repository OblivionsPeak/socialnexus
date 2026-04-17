import React, { useState } from 'react';
import { X, Clipboard, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const SmartIngest = ({ isOpen, onClose, onDataUpdate }) => {
  const [pastedText, setPastedText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error

  if (!isOpen) return null;

  const parseData = (text) => {
    setIsParsing(true);
    // Simulation of advanced parsing logic
    setTimeout(() => {
      let detectedPlatform = 'Unknown';
      if (text.toLowerCase().includes('linkedin')) detectedPlatform = 'LinkedIn';
      else if (text.toLowerCase().includes('instagram') || text.toLowerCase().includes('reach')) detectedPlatform = 'Instagram';
      else if (text.toLowerCase().includes('facebook')) detectedPlatform = 'Facebook';

      if (detectedPlatform !== 'Unknown') {
        setStatus('success');
        onDataUpdate({ platform: detectedPlatform, timestamp: new Date().toISOString() });
        setTimeout(() => {
          onClose();
          setPastedText('');
          setStatus('idle');
        }, 1500);
      } else {
        setStatus('error');
      }
      setIsParsing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-fade-in">
      <div className="glass-card w-full max-w-2xl bg-[#1e293b] p-10 relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.2)]">
        {/* Decorative Background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Smart Ingest Hub</h2>
              <p className="text-secondary text-sm">Paste any dashboard text to sync instantly.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-secondary hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 relative">
          <div className="relative">
            <textarea 
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Copy everything (Ctrl+A) from your Facebook/IG/LinkedIn insights and paste it here..."
              className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-indigo-500/50 transition-all text-sm font-mono resize-none"
            />
            {status === 'success' && (
              <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl animate-fade-in">
                <CheckCircle2 className="text-green-400 mb-2" size={48} />
                <p className="font-bold text-green-400">Sync Successful!</p>
              </div>
            )}
            {status === 'error' && (
              <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl animate-fade-in text-center p-6">
                <AlertCircle className="text-red-400 mb-2" size={48} />
                <p className="font-bold text-red-400">Unable to recognize format.</p>
                <p className="text-xs text-red-300/60 mt-2">Make sure you've selected all text from the dashboard.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-bold underline">Try Again</button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                Auto-Detection Active
              </div>
            </div>
            <button 
              disabled={!pastedText || isParsing}
              onClick={() => parseData(pastedText)}
              className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-3"
            >
              {isParsing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Clipboard size={18} />
                  Ingest Intel
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {['LinkedIn', 'Instagram', 'Facebook'].map(p => (
            <div key={p} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] font-bold text-secondary uppercase">{p}</p>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartIngest;
