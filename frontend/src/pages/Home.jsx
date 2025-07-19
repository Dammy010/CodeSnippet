import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Code Snippet Organizer</h1>
        <p className="text-xl md:text-2xl mb-8">
          Store, manage, and search your favorite code snippets easily.
        </p>
        <Link
          to={isAuthenticated ? '/add-snippet' : '/signup'}
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
        >
          {isAuthenticated ? 'Add Snippet' : 'Get Started'}
        </Link>
      </section>

      {/* Why CodeSnippet Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why CodeSnippet?</h2>
          <p className="text-lg mb-6">
            As developers, we often copy useful code from project to project. CodeSnippet helps you store those
            valuable code pieces in one organized, searchable place so you never lose track of them again.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">🚀 Fast Access</h3>
              <p>Easily search and find your snippets by language or tags in seconds.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">🧠 Stay Organized</h3>
              <p>Group code by language, topic, or purpose never lose that regex again.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">🔐 Secure & Private</h3>
              <p>Your snippets are stored securely and are only accessible to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="py-16 px-6 bg-gray-100 text-gray-800">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
    <p className="text-lg text-gray-600 mb-10">
      Organize your development workflow in just a few easy steps.
    </p>

    <div
      className={`grid gap-8 text-left ${
        isAuthenticated
          ? 'grid-cols-1 md:grid-cols-2 justify-center'
          : 'grid-cols-1 md:grid-cols-3'
      }`}
    >
      {!isAuthenticated && (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
          <p className="text-gray-600">Create an account to start storing your code snippets securely.</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="text-4xl mb-3">➕</div>
        <h3 className="text-xl font-semibold mb-2">
          {isAuthenticated ? '1' : '2'}. Add Snippets
        </h3>
        <p className="text-gray-600">
          Add code with title, language, tags, and description. Format-friendly and searchable.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="text-4xl mb-3">📂</div>
        <h3 className="text-xl font-semibold mb-2">
          {isAuthenticated ? '2' : '3'}. View, Edit, Delete
        </h3>
        <p className="text-gray-600">
          Manage your snippets anytime from your dashboard quickly and easily.
        </p>
      </div>
    </div>
  </div>
</section>

    </>
  );
}
