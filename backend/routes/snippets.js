const express = require('express');
const router = express.Router();
const {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} = require('../controllers/snippetController');

// Protected routes
router.get('/', getSnippets);
router.post('/', createSnippet);
router.get('/:id', getSnippetById); // ← Required for viewing a snippet
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);

module.exports = router;
