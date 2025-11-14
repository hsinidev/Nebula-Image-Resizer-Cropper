
import React, { useState } from 'react';
import ImageEditorTool from '../components/ImageEditorTool';
import SeoArticle from '../utils/SeoArticle';

const HomePage: React.FC = () => {
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);

  return (
    <div className="space-y-16 flex flex-col items-center">
      <header className="w-full text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 animate-fade-in-down">
            Your Private, In-Browser Image Editor
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
            Quickly resize, crop, and convert images without ever uploading them. Fast, secure, and entirely free.
        </p>
      </header>
      
      <ImageEditorTool />
      
      <section className="w-full bg-black/20 backdrop-blur-md border border-indigo-900/50 p-6 md:p-10 rounded-xl">
        <div 
          className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isArticleExpanded ? 'max-h-[10000px]' : 'max-h-24 md:max-h-20'}`}
        >
          <SeoArticle />
          {!isArticleExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0d0d21] to-transparent" />
          )}
        </div>
        <button 
          onClick={() => setIsArticleExpanded(!isArticleExpanded)}
          className="mt-4 text-purple-400 font-semibold hover:text-purple-300 transition-colors flex items-center space-x-2"
        >
          <span>{isArticleExpanded ? 'Read Less' : 'Read More About Client-Side Processing'}</span>
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isArticleExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </section>
    </div>
  );
};

export default HomePage;
