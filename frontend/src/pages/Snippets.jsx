import { useState, useEffect } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    axios
      .get(`/snippets${language ? `?language=${language}` : ''}`)
      .then((res) => setSnippets(res.data))
      .catch((err) => console.error(err));
  }, [language]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Explore Snippets</h2>
        <input
          type="text"
          placeholder="Filter by language (e.g., JavaScript)"
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      {snippets.length === 0 ? (
        <div className="text-gray-500 text-center py-20">
          <p className="text-lg">No snippets found{language && ` for "${language}"`}.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <Link
              to={`/snippets/${snippet._id}`}
              key={snippet._id}
              className="block p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-300 hover:border-blue-400"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{snippet.title}</h3>
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  {snippet.language}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{snippet.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
