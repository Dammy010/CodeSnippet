import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Eye, Pencil, Trash } from 'lucide-react';

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const { user } = useAuth();

  const loadSnippets = async () => {
    try {
      const res = await axios.get('/snippets');
      setSnippets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    try {
      await axios.delete(`/snippets/${id}`);
      loadSnippets();
    } catch (err) {
      alert('Error deleting snippet');
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to your dashboard, <span className="text-blue-600">{user?.name}</span> 👋
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          Manage all your saved code snippets from here.
        </p>
      </div>

      {/* Snippets List */}
      {snippets.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't added any snippets yet.{' '}
          <Link to="/add-snippet" className="text-blue-600 font-medium underline">
            Create one now →
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <div
              key={snippet._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1 text-blue-600">
                  <FileText size={20} />
                  <span className="font-medium text-sm">{snippet.language}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{snippet.title}</h3>
              </div>

              <div className="flex gap-4 text-sm font-medium mt-auto">
                <Link
                  to={`/snippets/${snippet._id}`}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Eye size={16} /> View
                </Link>
                <Link
                  to={`/edit-snippet/${snippet._id}`}
                  className="flex items-center gap-1 text-yellow-600 hover:underline"
                >
                  <Pencil size={16} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(snippet._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
