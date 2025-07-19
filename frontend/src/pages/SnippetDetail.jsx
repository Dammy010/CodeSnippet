import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript'; // Add more if needed

export default function SnippetDetail() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`/snippets/${id}`);
        setSnippet(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Snippet not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    alert('Code copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2" />
          <div className="h-60 bg-gray-200 rounded mt-6" />
        </div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center text-red-600 font-medium">
        {error || 'Snippet not found.'}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{snippet.title}</h1>
        <p className="text-sm text-gray-500">Language: <span className="font-medium">{snippet.language}</span></p>
        <p className="text-gray-600 mt-2">{snippet.description}</p>
      </div>

      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
        >
          Copy
        </button>
        <pre className="rounded-lg overflow-auto bg-gray-900 text-white p-4 text-sm max-h-[600px]">
          <code className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
