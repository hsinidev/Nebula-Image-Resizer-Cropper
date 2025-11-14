
import React, { useState } from 'react';
import GalaxyBackground from './GalaxyBackground';
import Modal from './Modal';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy' | 'Terms' | 'DMCA' | null;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    
    const getModalContent = (modal: ModalType) => {
        switch(modal) {
            case 'About': return (<div><h3>About Us</h3><p>Nebula Image Resizer is a powerful, client-side tool designed for fast and private image manipulation. Built by HSINI MOHAMED, it leverages the HTML Canvas API to provide a seamless experience without ever uploading your files to a server.</p></div>);
            case 'Contact': return (<div><h3>Contact Information</h3><p>For inquiries, please reach out via email:</p><ul><li><a href="mailto:hsini.web@gmail.com" class="text-purple-400 hover:underline">hsini.web@gmail.com</a></li><li>Website: <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">doodax.com</a></li></ul></div>);
            case 'Guide': return (<div><h3>How to Use</h3><ol><li>Click 'Upload Image' to select a file from your device.</li><li>The image will appear in the preview area.</li><li>Enter your desired width and height in the control panel.</li><li>Click 'Apply Resize' to see the resized image.</li><li>To crop, define the area and click 'Apply Crop'.</li><li>Select your desired output format (PNG/JPEG).</li><li>Click 'Download Final Image' to save the result.</li></ol></div>);
            case 'Privacy': return (<div><h3>Privacy Policy</h3><p>We respect your privacy. All image processing is done on your local machine using your browser's capabilities. No image data is ever sent to our servers or any third party. Your original files remain on your device.</p></div>);
            case 'Terms': return (<div><h3>Terms of Service</h3><p>By using this service, you agree not to process any illegal or harmful images. The service is provided "as is" without any warranties. The owner is not liable for any data loss or damage that may occur from using this tool.</p></div>);
            case 'DMCA': return (<div><h3>DMCA Policy</h3><p>As we do not host any content, any DMCA claims are not applicable. Users are responsible for the content they process. If you have concerns about the tool itself, please use the contact information provided.</p></div>);
            default: return null;
        }
    };

    const navLinks: ModalType[] = ['About', 'Contact', 'Guide', 'Privacy', 'Terms', 'DMCA'];
    const modalTitles = {
        'About': 'About Nebula Image Resizer',
        'Contact': 'Contact Us',
        'Guide': 'User Guide',
        'Privacy': 'Privacy Policy',
        'Terms': 'Terms of Service',
        'DMCA': 'DMCA Policy'
    }

  return (
    <div className="min-h-screen flex flex-col relative">
      <GalaxyBackground />
      <header className="w-full p-4 bg-black/30 backdrop-blur-sm z-10 border-b border-indigo-900/50 sticky top-0">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Nebula Image Resizer
            </h1>
            <div className="hidden md:flex items-center space-x-4">
                {navLinks.map(link => (
                    <button key={link} onClick={() => setActiveModal(link)} className="text-gray-300 hover:text-white transition-colors">
                        {link === 'Privacy' ? 'Privacy Policy' : link === 'Terms' ? 'Terms of Service' : link}
                    </button>
                ))}
            </div>
             <div className="md:hidden">
                 <select onChange={(e) => setActiveModal(e.target.value as ModalType)} className="bg-indigo-900/50 border border-indigo-700 rounded-md p-2 text-white">
                     <option>Menu</option>
                     {navLinks.map(link => <option key={link} value={link}>{link === 'Privacy' ? 'Privacy Policy' : link === 'Terms' ? 'Terms of Service' : link}</option>)}
                 </select>
            </div>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12 z-10">
        {children}
      </main>

      <footer className="w-full p-4 bg-black/30 backdrop-blur-sm z-10 border-t border-indigo-900/50 text-center">
        <p className="text-sm text-gray-400">
          Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" style={{color: '#FFD700'}} className="font-bold hover:underline">HSINI MOHAMED</a>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">doodax.com</a> | <a href="mailto:hsini.web@gmail.com" className="hover:text-gray-300">hsini.web@gmail.com</a>
        </p>
      </footer>

      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? modalTitles[activeModal] : ''}>
        {getModalContent(activeModal)}
      </Modal>
    </div>
  );
};

export default Layout;