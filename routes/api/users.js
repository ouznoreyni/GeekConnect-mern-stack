const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
/*
 *@Route POST api/users
 *@description Register User
 *@access public
 */
router.post(
  '/',
  [
    check('name', 'Entrer un nom valide').not().isEmpty().isLength({ min: 5 }),
    check('email', 'Entrer une adresse email valide').not().isEmpty().isEmail(),
    check('password', 'Entrer un mot de passe valide')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
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
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "L'utilisateur existe." }] });
      }
      //get users gravatar from email
      const avatar = gravatar.url({ email, s: '200', r: 'pg', d: 'mm' });

      //user instance
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      let pass = await bcrypt.hash(password, salt);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          return res.json({ token });
        },
      );
    } catch (error) {
      return res.status(500).send('Erreur Interne');
    }
  },
);

module.exports = router;
