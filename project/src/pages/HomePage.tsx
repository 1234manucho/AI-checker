import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Smartphone, Globe } from 'lucide-react';

function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-full h-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="absolute opacity-10 dark:opacity-5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 400 + 200}px`,
                  height: `${Math.random() * 400 + 200}px`,
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 ? 'var(--tw-color-primary-500, #3B82F6)' : 'var(--tw-color-secondary-500, #10B981)'
                  } 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  animation: `pulse-slow ${Math.random() * 5 + 10}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Verify before</span>
                <span className="block mt-1 text-primary-600 dark:text-primary-400">you share.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                MisinformAI uses artificial intelligence to fact-check viral content in real-time. 
                Upload text, images, videos, or voice messages and get accurate verification in seconds.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/upload"
                  className="btn-primary py-3 px-6 text-base"
                >
                  Verify Content
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/about"
                  className="btn-outline py-3 px-6 text-base"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: <Check size={18} />, text: "Real-time verification" },
                  { icon: <Shield size={18} />, text: "Source credibility scoring" },
                  { icon: <Globe size={18} />, text: "Multilingual support" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                      {item.icon}
                    </div>
                    <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:ml-auto lg:max-w-md"
            >
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl shadow-xl">
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp Verification</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fast • Accurate • Simple</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[75%]">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Is it true that drinking lemon water with baking soda cures cancer?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3 max-w-[75%]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-primary-800 dark:text-primary-300">MisinformAI</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Just now</span>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          <span className="font-semibold text-error-600 dark:text-error-400">False Claim</span>: There is no scientific evidence that drinking lemon water with baking soda cures cancer.
                        </p>
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                          <p>Sources: World Health Organization, Mayo Clinic</p>
                          <p>Credibility Score: 2%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-800 px-2 text-xs text-gray-500 dark:text-gray-400">
                          Verified in 8 seconds
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              MisinformAI uses advanced AI technology to verify content across multiple formats in seconds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Upload Content",
                description: "Upload or forward text, images, videos, or voice messages through WhatsApp, web, or SMS.",
                icon: <Smartphone className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
              },
              {
                title: "AI Analysis",
                description: "Our AI engine compares the content against verified sources using advanced algorithms.",
                icon: <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
              },
              {
                title: "Get Results",
                description: "Receive a detailed verification report with credibility score and source information.",
                icon: <Check className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card flex flex-col items-center text-center p-6"
              >
                <div className="mb-4 rounded-full bg-primary-50 p-3 dark:bg-primary-900/20">
                  {step.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Ready to fight misinformation?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Join the movement to promote media literacy and stop the spread of harmful misinformation.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <Link
                to="/upload"
                className="btn-primary py-3 px-6 text-base block text-center lg:inline-block"
              >
                Start Verifying Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;