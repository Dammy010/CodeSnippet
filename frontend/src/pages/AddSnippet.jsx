import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddSnippet() {
  const [form, setForm] = useState({
    title: '',
    language: '',
    tags: '',
    code: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/snippets', form);
      navigate('/snippets');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding snippet');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Code Snippet</h1>
        <p className="text-gray-500">Organize and save your favorite snippets in one place.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Sort array of objects"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <input
            name="language"
            value={form.language}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., JavaScript"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., sort, array, performance"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Briefly describe what this snippet does..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
          <textarea
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md font-mono text-sm leading-relaxed bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Paste your code here...`}
            rows={10}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Save Snippet
          </button>
        </div>
      </form>
    </div>
  );
}
