//
// visage-ai-webapp/app/[locale]/contact/page.tsx
// Contact Page for Visage AI
//

import Link from 'next/link';

export default function ContactPage() {
    const CONTACT_EMAIL = 'kyoharada@visageaiconsulting.com';
    const PRIVACY_EMAIL = 'privacy@visageaiconsulting.com';

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-800 font-sans">
            <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-lg shadow-md">

                <header className="border-b pb-6 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Get in touch with the Visage AI team
                    </p>
                </header>

                <div className="space-y-8">

                    {/* General Inquiries */}
                    <section className="p-6 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            General Inquiries
                        </h2>
                        <p className="text-gray-600 mb-4">
                            For business inquiries, partnership opportunities, or product questions.
                        </p>
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {CONTACT_EMAIL}
                        </a>
                    </section>

                    {/* Privacy & Data Requests */}
                    <section className="p-6 bg-blue-50 rounded-lg">
                        <h2 className="text-xl font-semibold text-blue-900 mb-3">
                            Privacy & Data Requests
                        </h2>
                        <p className="text-blue-800 mb-4">
                            For privacy-related questions or to submit a data request (access, deletion, etc.).
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={`mailto:${PRIVACY_EMAIL}`}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {PRIVACY_EMAIL}
                            </a>
                            <Link
                                href="/en/dsr"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Submit a Data Request →
                            </Link>
                        </div>
                    </section>

                    {/* Quick Links */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Quick Links
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link
                                href="/en/privacy"
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <h3 className="font-medium text-gray-900">Privacy Policy</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    How we handle your data
                                </p>
                            </Link>
                            <Link
                                href="/en/dsr"
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <h3 className="font-medium text-gray-900">Data Request</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Access or delete your data
                                </p>
                            </Link>
                            <Link
                                href="/en/docs"
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <h3 className="font-medium text-gray-900">Documentation</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    SDK & API guides
                                </p>
                            </Link>
                        </div>
                    </section>

                    {/* Response Time */}
                    <div className="text-sm text-gray-500 pt-6 border-t">
                        <p>
                            <strong>Response Time:</strong> We typically respond to all inquiries within 1-2 business days.
                            For urgent matters, please include &quot;URGENT&quot; in your email subject line.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
