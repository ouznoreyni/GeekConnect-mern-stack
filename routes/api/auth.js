const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

/*
 *@Route GET api/auth
 *@description auth route
 *@access public
 */

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur Interne');
  }
});

/*
 *@Route POST api/auth
 *@description Authenticate User and get token
 *@access public
 */
router.post(
  '/',
  [
    check('email', 'Entrer une adresse email valide').isEmail(),
    check('password', 'le mot de passe obligatoire').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ errors: [{ msg: 'email ou mot de passe invalide' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'email ou mot de passe invalide' }] });
      }
      //return json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erreur Interne');
    }
  }
);

module.exports = router;
