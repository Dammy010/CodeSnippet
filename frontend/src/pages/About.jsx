import React from 'react';

export default function About() {
  return (
    <div className="bg-white text-gray-800 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About CodeSnippet</h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Empowering developers to stay organized, focused, and efficient.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">💡 Our Mission</h2>
            <p>
              CodeSnippet was born from a common developer pain — forgetting or losing useful code you wrote or found
              weeks ago. We aim to provide a secure, searchable, and beautiful space to save your most valuable code
              pieces in one place.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">🛠️ Built for Developers</h2>
            <p>
              Whether you're working on frontend, backend, scripts, or anything in between, CodeSnippet lets you save
              snippets with titles, languages, tags, and descriptions. You can search, edit, or delete them anytime —
              from anywhere.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">🔐 Your Data is Yours</h2>
            <p>
              All snippets are private and only visible to you. We take data privacy seriously and ensure your work
              remains secure and confidential.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">🌎 Open for Everyone</h2>
            <p>
              Whether you're a student, a freelancer, or a professional engineer, CodeSnippet is designed to support
              all coding journeys. Join our growing community and start organizing your code smarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
