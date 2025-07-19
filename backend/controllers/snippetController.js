const Snippet = require('../models/Snippet');

exports.createSnippet = async (req, res) => {
  try {
    const { title, language, tags, code, description } = req.body;

    const newSnippet = new Snippet({
      title,
      language,
      tags: tags?.split(',').map(tag => tag.trim()) || [],
      code,
      description,
      createdBy: req.user.id,
    });

    const saved = await newSnippet.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create snippet', error: err.message });
  }
};


exports.getSnippets = async (req, res) => {
  try {
    const { language, tags } = req.query;
    const filter = {};

    if (language) filter.language = language;
    if (tags) filter.tags = { $in: tags.split(',').map(tag => tag.trim()) };

    const snippets = await Snippet.find(filter)
      .where('createdBy').equals(req.user.id)
      .sort({ createdAt: -1 });

    res.status(200).json(snippets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve snippets', error: err.message });
  }
};


exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    
    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(snippet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch snippet', error: err.message });
  }
};


exports.updateSnippet = async (req, res) => {
  try {
    const updated = await Snippet.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Snippet not found or unauthorized' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update snippet', error: err.message });
  }
};


exports.deleteSnippet = async (req, res) => {
  try {
    const deleted = await Snippet.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Snippet not found or unauthorized' });
    }

    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete snippet', error: err.message });
  }
};
