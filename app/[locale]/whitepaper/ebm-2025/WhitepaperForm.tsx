'use client';

import React, { useState } from 'react';
import { track } from '@/app/lib/analytics';

interface WhitepaperFormProps {
  t?: (key: string) => string;
}

export default function WhitepaperForm({ t }: WhitepaperFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Track form submission
      track('whitepaper_submit', {
        form_type: 'whitepaper_download',
        email_domain: formData.email.split('@')[1] || '(none)',
        company: formData.company,
        industry: formData.industry,
        role: formData.role,
      });

      // Call the API endpoint
      const response = await fetch('/api/whitepaper/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();

      // Track successful lead
      track('whitepaper_lead', {
        lead_type: 'whitepaper_download',
        email_domain: formData.email.split('@')[1] || '(none)',
        company: formData.company,
        industry: formData.industry,
        role: formData.role,
        lead_id: result.leadId,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(t ? t('whitepaper.formError') : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {t ? t('whitepaper.formSuccess') : 'Thank you! Your whitepaper is ready for download.'}
        </h3>
        <p className="text-green-700 mb-6">
          {t ? t('whitepaper.formSuccessDescription') : 'Check your email for the download link, or click below to download directly.'}
        </p>
        <a
          href="/whitepapers/ebm-2025-v0.1.html"
          target="_blank"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-all"
          onClick={() => track('whitepaper_download', { source: 'success_page' })}
        >
          {t ? t('whitepaper.downloadCta') : 'View & Print Whitepaper'}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          {t ? t('whitepaper.formFields.name') : 'Full Name'}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          {t ? t('whitepaper.formFields.email') : 'Email Address'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
          {t ? t('whitepaper.formFields.company') : 'Company Name'}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          {t ? t('whitepaper.formFields.role') : 'Job Title'}
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="industry" className="block text-gray-700 text-sm font-bold mb-2">
          {t ? t('whitepaper.formFields.industry') : 'Industry'}
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Downloading...' : (t ? t('whitepaper.formSubmit') : 'Download Now')}
        </button>
      </div>
    </form>
  );
}