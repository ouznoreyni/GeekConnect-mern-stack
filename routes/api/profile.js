const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

/*
 *@Route POST api/profile
 *@description create or update users profile
 *@access private
 */

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status est obligatoire').not().isEmpty(),
      check('skils', 'compotence est obligatoire').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkdin,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkdin) profileFields.linkdin = linkdin;
    if (instagram) profileFields.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);

      await Profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erreur Interne ');
    }
  }
);

module.exports = router;
