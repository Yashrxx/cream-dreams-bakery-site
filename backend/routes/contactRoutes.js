import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST: Submit a contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Admin - Fetch all contact submissions
router.get('/admin', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;