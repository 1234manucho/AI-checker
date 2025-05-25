import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, Image, Video, Mic, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContentType } from '../types';

interface FileUploaderProps {
  contentType: ContentType;
  isUploading: boolean;
}

function FileUploader({ contentType, isUploading }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    if (contentType === 'image') {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  }, [contentType]);
  
  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
  };
  
  const getAcceptedTypes = () => {
    switch (contentType) {
      case 'image':
        return { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] };
      case 'video':
        return { 'video/*': ['.mp4', '.webm', '.ogg', '.mov'] };
      case 'audio':
        return { 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] };
      default:
        return {};
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedTypes(),
    maxFiles: 1,
    disabled: isUploading || !!file
  });

  const getIcon = () => {
    switch (contentType) {
      case 'image':
        return <Image size={24} />;
      case 'video':
        return <Video size={24} />;
      case 'audio':
        return <Mic size={24} />;
      default:
        return <File size={24} />;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {contentType === 'image' ? 'Upload an image to verify' : 
         contentType === 'video' ? 'Upload a video to verify' :
         'Upload an audio file to verify'}
      </label>
      
      {file ? (
        <div className="relative rounded-lg border-2 border-gray-300 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            {contentType === 'image' && preview ? (
              <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                {getIcon()}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            {!isUploading && (
              <button
                type="button"
                onClick={removeFile}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Remove file"
              >
                <X size={18} />
              </button>
            )}
            
            {isUploading && (
              <Loader2 size={18} className="animate-spin text-gray-500" />
            )}
          </div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-900/20' 
                : 'border-gray-300 hover:border-primary-300 dark:border-gray-700 dark:hover:border-primary-700'
              }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                {isDragActive ? <Upload size={24} className="text-primary-500" /> : getIcon()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isDragActive
                    ? `Drop your ${contentType} here`
                    : `Drag and drop your ${contentType}, or click to browse`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {contentType === 'image' ? 'JPG, PNG or GIF up to 10MB' : 
                   contentType === 'video' ? 'MP4, WEBM or MOV up to 50MB' :
                   'MP3, WAV or M4A up to 10MB'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default FileUploader;