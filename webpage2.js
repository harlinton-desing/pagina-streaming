const express = require('express');
const router = express.Router();
const Resident = require('./models/Resident');
const Document = require('./models/Document');
const Permit = require('./models/Permit');
const User = require('./models/User');

// Resident routes
router.get('/residents', async (req, res) => {
  try {
    const residents = await Resident.find();
    res.render('residents/index', { residents });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/residents/new', (req, res) => {
  res.render('residents/new');
});

router.post('/residents', async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    req.flash('success', 'Resident added successfully');
    res.redirect('/residents');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/residents/new');
  }
});

router.get('/residents/:id/edit', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    res.render('residents/edit', { resident });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/residents/:id', async (req, res) => {
  try {
    await Resident.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Resident updated successfully');
    res.redirect('/residents');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/residents/${req.params.id}/edit`);
  }
});

router.delete('/residents/:id', async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    req.flash('success', 'Resident deleted successfully');
    res.redirect('/residents');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/residents');
  }
});

// Similar routes for documents, permits, users can be added here

module.exports = router;
