import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, ThumbsUp, ThumbsDown, AlertTriangle, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { FactCheckResult } from '../types';

function HistoryPage() {
  const [history, setHistory] = useState<FactCheckResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get verification history
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch the history from the API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock history data
        setHistory([
          {
            id: '123',
            content: 'Drinking lemon water with baking soda every morning cures cancer naturally.',
            contentType: 'text',
            verificationStatus: 'false',
            credibilityScore: 8,
            sources: [
              { name: 'World Health Organization', url: 'https://www.who.int', trustScore: 98 },
              { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', trustScore: 96 }
            ],
            explanation: 'This claim is false. There is no scientific evidence that drinking lemon water with baking soda cures cancer.',
            timestamp: new Date().toISOString(),
            language: 'en'
          },
          {
            id: '456',
            content: 'The new COVID-19 variant XBB causes severe illness in young adults.',
            contentType: 'text',
            verificationStatus: 'partially_true',
            credibilityScore: 45,
            sources: [
              { name: 'CDC', url: 'https://www.cdc.gov', trustScore: 97 },
              { name: 'WHO', url: 'https://www.who.int', trustScore: 98 }
            ],
            explanation: 'This claim is partially true. The XBB variant can cause illness, but current evidence does not suggest it specifically targets young adults or is more severe than previous variants.',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            language: 'en'
          },
          {
            id: '789',
            content: 'Proper handwashing with soap and water for at least 20 seconds helps prevent the spread of diseases.',
            contentType: 'text',
            verificationStatus: 'true',
            credibilityScore: 95,
            sources: [
              { name: 'CDC', url: 'https://www.cdc.gov', trustScore: 97 },
              { name: 'WHO', url: 'https://www.who.int', trustScore: 98 }
            ],
            explanation: 'This claim is true. Proper handwashing is an effective way to prevent the spread of many types of infections and illnesses.',
            timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            language: 'en'
          }
        ]);
      } catch (error) {
        toast.error('Error fetching verification history');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => 
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all verification history?')) {
      setHistory([]);
      toast.success('Verification history cleared');
    }
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
    toast.success('Item removed from history');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'true':
        return <ThumbsUp size={16} className="text-success-500" />;
      case 'false':
        return <ThumbsDown size={16} className="text-error-500" />;
      case 'partially_true':
        return <AlertTriangle size={16} className="text-warning-500" />;
      default:
        return <AlertTriangle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Verification History</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button className="btn-outline">
              <Filter size={18} className="mr-2" />
              Filter
            </button>
            
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="btn-danger"
              >
                <Trash2 size={18} className="mr-2" />
                Clear History
              </button>
            )}
          </div>
        </div>
        
        <div className="card">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading verification history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Clock size={48} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Verification History
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
                {searchTerm 
                  ? 'No results found for your search. Try different keywords.'
                  : 'You haven\'t verified any content yet. Your verification history will appear here.'}
              </p>
              <Link to="/upload" className="btn-primary">
                Verify New Content
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-40">Verified</th>
                    <th className="px-4 py-3 w-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredHistory.map((item) => (
                    <tr 
                      key={item.id}
                      className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <Link to={`/results/${item.id}`} className="block hover:text-primary-600 dark:hover:text-primary-400">
                          <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2">{item.content}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${item.verificationStatus === 'true' 
                              ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400'
                              : item.verificationStatus === 'false'
                              ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400'
                              : 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400'
                            }"
                          >
                            {getStatusIcon(item.verificationStatus)}
                            <span className="ml-1">
                              {item.verificationStatus === 'true' 
                                ? 'True' 
                                : item.verificationStatus === 'false' 
                                ? 'False' 
                                : 'Partially True'}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-sm font-medium
                          ${item.credibilityScore >= 70 
                            ? 'text-success-600 dark:text-success-400' 
                            : item.credibilityScore >= 30
                            ? 'text-warning-600 dark:text-warning-400'
                            : 'text-error-600 dark:text-error-400'
                          }`}
                        >
                          {item.credibilityScore}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="text-gray-400 hover:text-error-500 dark:hover:text-error-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Delete item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default HistoryPage;