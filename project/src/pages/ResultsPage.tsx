import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ThumbsUp, ThumbsDown, Copy, ExternalLink, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import VerificationMeter from '../components/VerificationMeter';
import { FactCheckResult } from '../types';

function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get verification results
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch the result from the API
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock result data
        setResult({
          id: id || '123',
          content: 'Drinking lemon water with baking soda every morning cures cancer naturally.',
          contentType: 'text',
          verificationStatus: 'false',
          credibilityScore: 8,
          sources: [
            { name: 'World Health Organization', url: 'https://www.who.int', trustScore: 98 },
            { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', trustScore: 96 },
            { name: 'National Cancer Institute', url: 'https://www.cancer.gov', trustScore: 97 }
          ],
          explanation: 'This claim is false. There is no scientific evidence that drinking lemon water with baking soda cures cancer. According to the World Health Organization and multiple medical institutions, cancer requires proper medical treatment. While maintaining a healthy diet can support overall health during cancer treatment, no food or drink combination has been proven to cure cancer.',
          additionalContext: 'This is a common type of misinformation that promotes "natural cures" for serious medical conditions. Such claims can be dangerous as they may discourage people from seeking proper medical treatment.',
          detectedIssues: ['Unverified health claim', 'Lacks scientific evidence', 'Contradicts medical consensus'],
          timestamp: new Date().toISOString(),
          language: 'en'
        });
      } catch (error) {
        toast.error('Error fetching verification results');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const handleCopyResults = () => {
    if (!result) return;
    
    const text = `
MisinformAI Fact Check Result:
Claim: "${result.content}"
Verdict: ${result.verificationStatus === 'true' ? 'TRUE' : result.verificationStatus === 'false' ? 'FALSE' : 'PARTIALLY TRUE'}
Credibility Score: ${result.credibilityScore}%
Explanation: ${result.explanation}
Sources: ${result.sources.map(s => s.name).join(', ')}
    `.trim();
    
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Results copied to clipboard'))
      .catch(() => toast.error('Failed to copy results'));
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'MisinformAI Fact Check Result',
        text: `Fact Check: "${result.content.substring(0, 50)}..." - ${result.verificationStatus === 'true' ? 'TRUE' : result.verificationStatus === 'false' ? 'FALSE' : 'PARTIALLY TRUE'}`,
        url: window.location.href,
      })
      .catch(() => toast.error('Error sharing results'));
    } else {
      handleCopyResults();
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/upload" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Processing Results...</h1>
          </div>
          
          <div className="card">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                Analyzing content and verifying facts...
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This usually takes a few seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="flex flex-col items-center justify-center py-10">
              <AlertTriangle size={48} className="text-warning-500 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Result Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We couldn't find the verification result you're looking for.
              </p>
              <Link to="/upload" className="btn-primary">
                Try Another Verification
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (result.verificationStatus) {
      case 'true':
        return 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20';
      case 'false':
        return 'text-error-600 dark:text-error-400 bg-error-50 dark:bg-error-900/20';
      case 'partially_true':
        return 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getStatusText = () => {
    switch (result.verificationStatus) {
      case 'true':
        return 'True';
      case 'false':
        return 'False';
      case 'partially_true':
        return 'Partially True';
      default:
        return 'Unverified';
    }
  };

  const getStatusIcon = () => {
    switch (result.verificationStatus) {
      case 'true':
        return <ThumbsUp size={20} />;
      case 'false':
        return <ThumbsDown size={20} />;
      case 'partially_true':
        return <AlertTriangle size={20} />;
      default:
        return <AlertTriangle size={20} />;
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
        <div className="flex items-center mb-6">
          <Link to="/upload" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Verification Results</h1>
        </div>
        
        <div className="card">
          {/* Verification Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="ml-1">{getStatusText()}</span>
              </span>
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Verified {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleCopyResults}
                className="btn-outline p-2"
                aria-label="Copy results"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={handleShare}
                className="btn-outline p-2"
                aria-label="Share results"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Verified Content:</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200">{result.content}</p>
            </div>
          </div>

          {/* Credibility Score */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Credibility Score:</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <VerificationMeter score={result.credibilityScore} />
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Analysis:</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200">{result.explanation}</p>
              
              {result.additionalContext && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Additional Context:</h3>
                  <p className="text-gray-800 dark:text-gray-200">{result.additionalContext}</p>
                </div>
              )}
            </div>
          </div>

          {/* Issues Detected */}
          {result.detectedIssues && result.detectedIssues.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Issues Detected:</h2>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <ul className="space-y-1">
                  {result.detectedIssues.map((issue, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle size={16} className="text-warning-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Sources */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Verified Against These Sources:</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <ul className="space-y-3">
                {result.sources.map((source, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="text-gray-800 dark:text-gray-200">{source.name}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                        Trust: {source.trustScore}%
                      </span>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      aria-label={`Visit ${source.name}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Was this verification helpful to you?
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-outline flex items-center">
              <ThumbsUp size={16} className="mr-2" />
              Helpful
            </button>
            <button className="btn-outline flex items-center">
              <ThumbsDown size={16} className="mr-2" />
              Not Helpful
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultsPage;