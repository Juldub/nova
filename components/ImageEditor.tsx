
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !prompt) return;

    setIsProcessing(true);
    try {
      const result = await geminiService.editImage(originalImage, prompt);
      if (result) {
        setEditedImage(result);
      }
    } catch (err) {
      alert("Failed to edit image. Ensure your API key is valid and prompt is clear.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="studio" className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Creative Studio</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experiment with AI-powered image editing. Powered by Gemini 2.5 Flash Image. 
            Try "Add a futuristic neon glow" or "Apply a moody black and white filter".
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-center overflow-hidden group hover:border-purple-500/50 transition-colors"
              onClick={() => !originalImage && fileInputRef.current?.click()}
            >
              {originalImage ? (
                <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="mb-4 text-slate-500 group-hover:text-purple-400 transition-colors">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 font-medium">Click to upload or drag image</p>
                  <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              {originalImage && (
                <button 
                  onClick={(e) => { e.stopPropagation(); clear(); }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Describe your edit</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g. Add a retro 80s synthwave filter..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none h-24"
              />
              <button
                onClick={handleEdit}
                disabled={isProcessing || !originalImage || !prompt}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white shadow-lg hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <span>Apply AI Magic</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Area */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl border border-slate-700 bg-slate-800/30 flex items-center justify-center overflow-hidden">
              {editedImage ? (
                <img src={editedImage} alt="Edited Result" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center opacity-30 select-none">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 font-medium italic">Your result will appear here</p>
                </div>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-400 font-bold tracking-widest text-sm">PROCESSING IMAGE</p>
                </div>
              )}
            </div>
            
            {editedImage && (
              <div className="flex gap-4">
                 <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = editedImage;
                    link.download = 'edited-result.png';
                    link.click();
                  }}
                  className="flex-1 py-4 rounded-xl bg-slate-800 border border-slate-700 font-bold hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Result</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageEditor;
