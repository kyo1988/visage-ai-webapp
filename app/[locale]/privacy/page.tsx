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
              Last Updated: December 13, 2025
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
                  <strong>Photos and Camera Access:</strong> Our app requires access to your camera and photo library for the sole purpose of analyzing your skin condition. The images you select are processed on your device or on secure servers (Firebase) for analysis.
                </li>
                <li>
                  <strong>Analysis Data:</strong> The skin analysis results (e.g., skin age, scores) are generated on your device or on our servers. To help us improve our services and for our business purposes, this anonymized analysis data is sent to our secure servers (Firebase).
                </li>
                <li>
                  <strong>Anonymous User ID:</strong> We use Firebase Anonymous Authentication to assign a unique, non-personally identifiable ID to your device. This allows us to associate your analysis history without collecting any personal information like your name, email address, or device ID.
                </li>
                <li>
                  <strong>Face Data:</strong> Face photos and derived skin metrics are collected and used as described in detail in Section 2 below.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                2. Face Data (Photos and Derived Data)
              </h2>
              <p>
                Our app, Visage AI: Skin Advisor, uses the device camera to capture a facial image only when the user explicitly initiates a skin analysis.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                What We Collect:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Face photos provided by you when you initiate a skin analysis</li>
                <li>Derived data: skin metrics, scores, and optional heatmaps/masks generated from the analysis</li>
                <li>No biometric identifiers (such as facial recognition templates or identity data) are collected or stored</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                Purpose of Use:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>On-device or server-based analysis to generate skin condition metrics</li>
                <li>Storing analysis history for your reference</li>
                <li>Generating PDF reports that you can export and share</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                Third-Party Sharing:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>We do not directly share face photos or facial data with third parties</li>
                <li>Service providers (Firebase/Google) process data on our behalf for storage and analysis purposes</li>
                <li>Only anonymized numerical skin scores are stored in Firebase Firestore for displaying your analysis history</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                Storage Location:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Firebase Storage: Images are stored in the format <code className="bg-gray-100 px-1 rounded">anonymous/&#123;appInstanceId&#125;/...</code></li>
                <li>Firestore: Diagnosis result data (anonymized scores and metrics)</li>
                <li>On-device: Temporary processing during analysis</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                Retention Period:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Images: Deleted immediately after analysis, or retained for a maximum of 30 days (TTL - Time To Live)</li>
                <li>Diagnosis history: 30 days (TTL)</li>
                <li>All data is automatically deleted after the retention period expires</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
                User Controls:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>You can request data deletion through the app&apos;s Settings screen by selecting &quot;Request Data Deletion&quot;</li>
                <li>You can also request data deletion by emailing us at <a href="mailto:privacy@visageai.app" className="text-blue-600 hover:underline">privacy@visageai.app</a></li>
                <li>Data Subject Requests (DSR) are typically processed within 30 days</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                3. How We Use Your Information
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
                4. Data Storage and Security
              </h2>
              <p>
                Your anonymized analysis data and the associated anonymous user ID are stored securely on Google&apos;s Firebase platform. Face photos and analysis images are stored in Firebase Storage with a 30-day TTL (Time To Live) policy, meaning they are automatically deleted after 30 days. Diagnosis history is stored in Firestore with a 30-day TTL.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                5. Third-Party Services
              </h2>
              <p>
                We use Firebase services provided by Google for authentication, database, and storage. Their privacy policy can be found at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">policies.google.com/privacy</a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                6. Data Subject Rights (DSR) and Data Deletion
              </h2>
              <p>
                You have the right to request deletion of your personal data at any time. You can request data deletion through:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>The app&apos;s Settings screen: Select &quot;Request Data Deletion&quot;</li>
                <li>Email: Send a request to <a href="mailto:privacy@visageai.app" className="text-blue-600 hover:underline">privacy@visageai.app</a> with the subject &quot;DSR Request&quot;</li>
                <li>Web form: Visit <a href="https://visageai.app/dsr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://visageai.app/dsr</a></li>
              </ul>
              <p className="mt-2">
                Data deletion requests are typically processed within 30 days. When you request deletion, the following data will be removed:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Firestore data: Diagnosis results and user settings (based on appInstanceId)</li>
                <li>Firebase Storage: Uploaded files in the format <code className="bg-gray-100 px-1 rounded">anonymous/&#123;appInstanceId&#125;/...</code></li>
                <li>GA4 data: Deleted using GA4 User Deletion API (when property ID is configured)</li>
                <li>BigQuery data: Recorded in audit tables and excluded via filter views (tables are not deleted, but data is excluded through audit logs and exclusion views)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                7. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to request data deletion, please contact us at: <a href="mailto:privacy@visageai.app" className="text-blue-600 hover:underline">privacy@visageai.app</a>
              </p>
            </section>
          </div>
  
        </div>
      </main>
    );
  }