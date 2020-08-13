const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/*
 *@Route GET api/profile
 *@description GET current users profile
 *@access private
 */

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await (
      await Profile.findOne({ user: req.user.id })
    ).populated('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).send('Le profile n existe pas');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Erreur Interne');
  }
});

module.exports = router;
