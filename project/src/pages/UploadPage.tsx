import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, File, Image, Video, Mic, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FileUploader from '../components/FileUploader';
import { ContentType } from '../types';

function UploadPage() {
  const [activeTab, setActiveTab] = useState<ContentType>('text');
  const [isUploading, setIsUploading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (tab: ContentType) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'text' && !textInput.trim()) {
      toast.error('Please enter some text to verify');
      return;
    }
    
    // Simulate verification process
    setIsUploading(true);
    
    try {
      // In a real app, we would send the content to the API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Navigate to results page with a fake ID
      // In a real app, this would be the ID returned from the API
      navigate('/results/123');
    } catch (error) {
      toast.error('An error occurred while verifying the content');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Verify Content</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Upload text, images, videos, or voice messages for real-time fact checking
          </p>
        </div>

        <div className="card">
          {/* Content Type Tabs */}
          <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'text', label: 'Text', icon: <File size={18} /> },
              { id: 'image', label: 'Image', icon: <Image size={18} /> },
              { id: 'video', label: 'Video', icon: <Video size={18} /> },
              { id: 'audio', label: 'Audio', icon: <Mic size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as ContentType)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              {activeTab === 'text' ? (
                <div>
                  <label htmlFor="content-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter text to verify
                  </label>
                  <textarea
                    id="content-text"
                    rows={5}
                    className="input resize-none"
                    placeholder="Paste or type the text you want to verify..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={isUploading}
                  ></textarea>
                </div>
              ) : (
                <FileUploader
                  contentType={activeTab}
                  isUploading={isUploading}
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <AlertTriangle size={14} className="mr-1" />
                Your privacy is important to us. Content is only used for verification.
              </div>
              
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Upload size={18} className="mr-2" />
                    Verify Content
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "What types of content can I verify?",
                answer: "MisinformAI can verify text, images, videos, and audio content. Our system analyzes the content against credible sources to provide accurate verification."
              },
              {
                question: "How long does verification take?",
                answer: "Most verifications are completed within 5-30 seconds, depending on the content type and complexity of the claims being analyzed."
              },
              {
                question: "Is my content kept private?",
                answer: "Yes, we prioritize your privacy. Your content is only used for verification purposes and is not stored permanently unless you explicitly allow it for improvement of our services."
              },
              {
                question: "How accurate is the verification?",
                answer: "MisinformAI uses advanced AI and a database of trusted sources to provide high-accuracy verification. We provide a confidence score with each result to indicate the reliability of our analysis."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UploadPage;