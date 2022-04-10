import CryptoJS from "crypto-js";
import 'dotenv/config';

import User from "../models/User.js";
import { validateEmail, validatePassword } from "../helpers/validation.js";

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const user = await User.findById(req.params.id);
  if (req.body.password) {
    if (!req.body.currentPassword) return res.code(403).send(new Error('Unauthorized'));

    const hashedPass = CryptoJS.AES.decrypt(user['password'], process.env.PASS_SEC);
    const originPassword = hashedPass.toString(CryptoJS.enc.Utf8);

    if (originPassword !== req.body.currentPassword) return res.code(401).send(new Error('Mot de passe incorrect !'));
    if (!validatePassword(req.body.password)) return res.status(422).send(new Error('Informations erronées !'));

    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }

  if (req.body.email) {
    if (!validateEmail(req.body.email)) return res.status(422).send(new Error('Email invalide !'));
  }

    const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, {
      $set: req.body
    }, { new: true });
    const { password, ...other } = updateUser.toJSON();
    res.send(other);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid user ID';
    if (e?.['keyPattern']?.['email']) res.status(409).send(new Error('Email déjà enregistrer !'));
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, isAdmin, ...other } = user.toJSON();
    res.send(other);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid user ID';
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const listUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    const users = listUsers.map(user => {
      const { password, ...other } = user.toJSON()
      return other
    })
    res.send(users);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getUsersStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);

    res.send(data);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};