import React, { useState, useRef, useCallback, useEffect } from 'react';
import { loadImageOnCanvas, downloadImage, convertImageFormat } from '../lib/ImageCanvasProcessor';

type ImageFormat = 'png' | 'jpeg';

const ImageEditorTool: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [outputFormat, setOutputFormat] = useState<ImageFormat>('jpeg');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('download');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvasRef.current) {
      setIsLoading(true);
      setError(null);
      setProcessedImageUrl(null);
      try {
        const image = await loadImageOnCanvas(file, canvasRef.current);
        setOriginalImage(image);
        setFileName(file.name.split('.').slice(0, -1).join('.'));
        setWidth(image.width);
        setHeight(image.height);
      } catch (err) {
        setError('Could not load the image file. Please try a different file.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!processedImageUrl) {
        setError('Please apply a transformation before downloading.');
        return;
    }
    setError(null);
    try {
        setIsLoading(true);
        const finalImage = await convertImageFormat(processedImageUrl, outputFormat);
        downloadImage(finalImage, `${fileName}-edited.${outputFormat}`);
    } catch (err) {
        setError('Failed to convert and download image.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };
  
  const applyResize = () => {
    if (!originalImage) {
        setError('Please upload an image first.');
        return;
    }
    setError(null);
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext('2d');
    if(ctx){
        ctx.drawImage(originalImage, 0, 0, width, height);
        setProcessedImageUrl(offscreenCanvas.toDataURL());
    }
  };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const syntheticEvent = {
                target: { files: e.dataTransfer.files }
            } as React.ChangeEvent<HTMLInputElement>;
            handleFileChange(syntheticEvent);
        }
    };


  return (
    <div className="w-full bg-black/20 backdrop-blur-md border border-indigo-900/50 p-4 md:p-6 rounded-xl shadow-2xl shadow-purple-500/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 border-b-2 border-purple-800 pb-2">Controls</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">1. Output Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-400 mb-1">Width (px)</label>
                <input type="number" id="width" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)} className="w-full bg-indigo-900/50 border border-indigo-700 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-400 mb-1">Height (px)</label>
                <input type="number" id="height" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)} className="w-full bg-indigo-900/50 border border-indigo-700 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300">2. Apply Transformation</h3>
            <button onClick={applyResize} disabled={!originalImage || isLoading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20">
              {isLoading ? 'Processing...' : 'Apply Resize'}
            </button>
             <p className="text-xs text-gray-500 text-center">Simple cropping coming soon!</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">3. Download</h3>
             <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-400 mb-1">Image Format</label>
                <select id="format" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as ImageFormat)} className="w-full bg-indigo-900/50 border border-indigo-700 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500">
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                </select>
            </div>
            <button onClick={handleDownload} disabled={!processedImageUrl || isLoading} className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-lg shadow-lg shadow-green-500/20">
              Download Final Image
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-4 p-3 bg-red-900/30 border border-red-700 rounded-md">{error}</p>}
        </div>

        {/* Image Preview Area */}
        <div className="lg:col-span-2 space-y-6">
          <label 
            htmlFor="file-upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full h-[300px] lg:h-full min-h-[300px] border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-purple-500 bg-purple-900/30 scale-105' : 'border-indigo-700 hover:border-indigo-500'}`}>
            
            {originalImage ? (
                 <div className="relative w-full h-full p-2 flex justify-center items-center">
                    <h3 className="absolute top-2 left-2 text-sm bg-black/50 px-2 py-1 rounded-md z-10">Original Preview</h3>
                    <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
                 </div>
            ) : (
                <div className="text-center p-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-500 transition-transform duration-300 transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-lg font-semibold text-gray-300">Click or Drag & Drop Image</p>
                    <p className="text-sm text-gray-500">Your files are processed locally & never uploaded</p>
                </div>
            )}
          </label>
          <input id="file-upload" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
           
           {processedImageUrl && (
               <div>
                   <h3 className="text-xl font-bold text-gray-300 mb-2">Processed Preview</h3>
                   <div className="w-full bg-black/30 border border-green-700 rounded-lg p-2">
                        <img src={processedImageUrl} alt="Processed" className="max-w-full max-h-[400px] object-contain mx-auto rounded" />
                   </div>
               </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ImageEditorTool;
