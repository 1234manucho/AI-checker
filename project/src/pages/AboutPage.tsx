import { motion } from 'framer-motion';
import { Check, Shield, Globe, AlertTriangle, Smartphone, GitBranch, Heart } from 'lucide-react';

function AboutPage() {
  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About MisinformAI</h1>
          
          <div className="card mb-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="lead text-lg text-gray-700 dark:text-gray-300">
                MisinformAI is a real-time AI assistant that helps users verify potentially misleading content across multiple formats including text, images, videos, and voice messages.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
              <p>
                In a world where misinformation spreads rapidly across digital platforms, our mission is to empower people with tools to easily verify content before sharing it. We believe that by making fact-checking accessible, we can build a more informed digital ecosystem and reduce the harmful impacts of false information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">The Problem We're Solving</h2>
              <p>
                Across Africa and globally, misinformation spreads rapidly via platforms like WhatsApp, Facebook, Telegram, and TikTok, particularly about:
              </p>
              <ul>
                <li>Health (e.g., fake vaccine claims)</li>
                <li>Agriculture (e.g., banned fertilizers)</li>
                <li>Politics (e.g., election disinformation)</li>
                <li>Finance (e.g., scams or false crypto tips)</li>
              </ul>
              <p>
                Most users lack the tools to verify this content instantly, leading to dangerous real-world consequences.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">How It Works</h2>
              <p>
                MisinformAI uses advanced artificial intelligence, including large language models (LLMs), retrieval-augmented generation (RAG), and AI media forensics to deliver accurate, trusted, multilingual fact-checking in under 30 seconds.
              </p>
              <p>
                When you submit content, our system:
              </p>
              <ol>
                <li>Analyzes the content using specialized AI models</li>
                <li>Compares claims against verified sources including major health organizations, news outlets, and government databases</li>
                <li>Evaluates images and videos for signs of manipulation</li>
                <li>Provides a comprehensive verification report with a credibility score</li>
              </ol>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
          
          <div className="grid gap-6 mb-12">
            {[
              {
                icon: <Smartphone size={24} />,
                title: "Multi-Channel Access",
                description: "Upload/forward content through WhatsApp, web interface, or SMS (USSD-lite fallback)."
              },
              {
                icon: <Shield size={24} />,
                title: "AI Fact Analysis",
                description: "Uses GPT-4 + RAG to match information with real-time verified sources."
              },
              {
                icon: <AlertTriangle size={24} />,
                title: "Image/Video Verification",
                description: "Detects fake/misleading visual content via deepfake detection and frame analysis."
              },
              {
                icon: <Check size={24} />,
                title: "Source Credibility Score",
                description: "Rates and explains credibility based on source trust level and match percentage."
              },
              {
                icon: <Globe size={24} />,
                title: "Multilingual Support",
                description: "Supports local languages like Swahili, Gikuyu, Hausa, and Luganda."
              },
              {
                icon: <GitBranch size={24} />,
                title: "Alert System",
                description: "Auto-detects viral trends and issues region-specific alerts."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="card flex"
              >
                <div className="mr-4 mt-1 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
          
          <div className="card mb-12">
            <div className="prose dark:prose-invert max-w-none">
              <p>
                MisinformAI was created by a team of technologists, journalists, and researchers passionate about combating the spread of misinformation. Our interdisciplinary team combines expertise in:
              </p>
              <ul>
                <li>Artificial Intelligence and Machine Learning</li>
                <li>Natural Language Processing</li>
                <li>Media Forensics</li>
                <li>Fact-checking Methodologies</li>
                <li>User Experience Design</li>
              </ul>
              <p>
                We collaborate with journalists, researchers, and fact-checking organizations around the world to continuously improve our verification capabilities.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 text-center">
            <Heart size={48} className="mx-auto text-primary-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help us fight misinformation and build a more informed digital ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">
                Partner With Us
              </button>
              <button className="btn-outline">
                Support Our Work
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutPage;