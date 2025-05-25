import { AlertTriangle } from 'lucide-react';

interface LogoProps {
  className?: string;
}

function Logo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 opacity-80"></div>
      <AlertTriangle className="relative text-white" size="70%" />
    </div>
  );
}

export default Logo;