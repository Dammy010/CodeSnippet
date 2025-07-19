import { useState, useEffect } from "react";
import axios from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditSnippet() {
  const [form, setForm] = useState({
    title: "",
    language: "",
    tags: "",
    code: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/snippets/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/snippets/${id}`, form);
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading snippet...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Snippet</h2>
        <p className="text-gray-500">
          Make updates to your code snippet below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Language</label>
          <input
            type="text"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Tags <span className="text-gray-400">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 min-h-[80px] focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Code</label>
          <textarea
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 font-mono min-h-[200px] focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Update Snippet
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition font-medium shadow-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
