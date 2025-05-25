import { motion } from 'framer-motion';

interface VerificationMeterProps {
  score: number;
}

function VerificationMeter({ score }: VerificationMeterProps) {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Determine color based on score
  const getColor = () => {
    if (normalizedScore >= 70) return 'success';
    if (normalizedScore >= 30) return 'warning';
    return 'error';
  };
  
  const color = getColor();
  const colorClasses = {
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
    error: 'text-error-600 dark:text-error-400',
  };
  
  const bgColorClasses = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  
  // Messages based on score range
  const getMessage = () => {
    if (normalizedScore >= 80) return 'Highly credible content';
    if (normalizedScore >= 60) return 'Mostly credible with minor issues';
    if (normalizedScore >= 40) return 'Mixed credibility';
    if (normalizedScore >= 20) return 'Low credibility';
    return 'Not credible';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className={`text-3xl font-bold ${colorClasses[color]}`}>
          {normalizedScore}%
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {getMessage()}
        </div>
      </div>
      
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${bgColorClasses[color]}`}
        ></motion.div>
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Not Credible</span>
        <span>Highly Credible</span>
      </div>
    </div>
  );
}

export default VerificationMeter;