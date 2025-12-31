//
// visage-ai-webapp/app/[locale]/dsr/page.tsx
// Data Subject Request (DSR) Page - GDPR/CCPA compliance
//

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

type RequestType = 'delete' | 'access' | 'other';

export default function DSRPage() {
    const [email, setEmail] = useState('');
    const [requestType, setRequestType] = useState<RequestType>('delete');
    const [message, setMessage] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const CONTACT_EMAIL = 'privacy@visageaiconsulting.com';

    const getSubject = () => {
        const typeLabels: Record<RequestType, string> = {
            delete: 'Data Deletion Request',
            access: 'Data Access Request',
            other: 'Privacy Inquiry'
        };
        return `[DSR] ${typeLabels[requestType]}`;
    };

    const getBody = () => {
        return `Request Type: ${requestType.charAt(0).toUpperCase() + requestType.slice(1)}

Email: ${email}

Message:
${message}

---
Sent via Visage AI DSR Form`;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Honeypot check (bot protection)
        if (honeypot) {
            console.log('Bot detected');
            return;
        }

        // Open mailto link
        const subject = encodeURIComponent(getSubject());
        const body = encodeURIComponent(getBody());
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        setSubmitted(true);
    };

    const handleCopy = async () => {
        const text = `To: ${CONTACT_EMAIL}
Subject: ${getSubject()}

${getBody()}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (submitted) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-800 font-sans">
                <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-lg shadow-md text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Client Opened</h1>
                    <p className="text-gray-600 mb-6">
                        Your email client should have opened with the pre-filled request.
                        Please send the email to complete your request.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        If your email client didn&apos;t open, please send an email to{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-blue-600 hover:underline"
                    >
                        ← Submit another request
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-800 font-sans">
            <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-lg shadow-md">

                <header className="border-b pb-6 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Data Subject Request
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Request access to or deletion of your personal data
                    </p>
                </header>

                <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                    <h2 className="font-semibold text-blue-900 mb-2">Your Rights</h2>
                    <p className="text-sm text-blue-800">
                        Under GDPR, CCPA, and other privacy regulations, you have the right to:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-blue-800 space-y-1">
                        <li>Request a copy of your personal data</li>
                        <li>Request deletion of your personal data</li>
                        <li>Correct inaccurate personal data</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter the email address associated with your account
                        </p>
                    </div>

                    <div>
                        <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">
                            Request Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="requestType"
                            required
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value as RequestType)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="delete">Delete my data</option>
                            <option value="access">Access my data</option>
                            <option value="other">Other privacy inquiry</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Information <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Please provide any additional details about your request..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Submit via Email
                        </button>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t text-sm text-gray-500">
                    <p>
                        We will respond to your request within 30 days. For any questions,
                        please contact us at{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                    <p className="mt-4">
                        <Link href="/en/privacy" className="text-blue-600 hover:underline">
                            ← Back to Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
