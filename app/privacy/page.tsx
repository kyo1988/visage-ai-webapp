//
// visage-ai-webapp/app/privacy/page.tsx
// 【最終確定版コード - App Store審査対応プライバシーポリシー】
//

export default function PrivacyPolicyPage() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-800 font-sans">
        <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-lg shadow-md">
          
          {/* ヘッダーセクション */}
          <header className="border-b pb-6 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="mt-2 text-gray-500">
              Last Updated: July 14, 2025
            </p>
          </header>
  
          {/* コンテンツセクション */}
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              Welcome to Visage AI. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
            </p>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                1. Information We Collect
              </h2>
              <p>
                We are committed to protecting your privacy. Our app is designed to perform all AI analysis directly on your device.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>
                  <strong>Photos and Camera Access:</strong> Our app requires access to your camera and photo library for the sole purpose of analyzing your skin condition. The images you select are processed locally on your device.
                </li>
                <li>
                  <strong>Analysis Data:</strong> The skin analysis results (e.g., skin age, scores) are generated on your device. To help us improve our services and for our business purposes as outlined in our vision, this anonymized analysis data is sent to our secure servers (Firebase).
                </li>
                <li>
                  <strong>Anonymous User ID:</strong> We use Firebase Anonymous Authentication to assign a unique, non-personally identifiable ID to your device. This allows us to associate your analysis history without collecting any personal information like your name, email address, or device ID.
                </li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                2. How We Use Your Information
              </h2>
              <p>
                The anonymized data we collect is used for the following purposes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>To provide and improve our skin analysis features.</li>
                <li>For research and development to enhance our AI models.</li>
                <li>To provide aggregated, anonymous market insights to our business partners (cosmetic brands) as part of our B2B services. Your individual data will never be shared.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                3. Data Storage and Security
              </h2>
              <p>
                Your anonymized analysis data and the associated anonymous user ID are stored securely on Google&apos;s Firebase platform. We do not store your original photos on our servers by default.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                4. Third-Party Services
              </h2>
              <p>
                We use Firebase services provided by Google for authentication, database, and storage. Their privacy policy can be found at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">policies.google.com/privacy</a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                5. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@visage-ai.com" className="text-blue-600 hover:underline">privacy@visage-ai.com</a>
              </p>
            </section>
          </div>
  
        </div>
      </main>
    );
  }