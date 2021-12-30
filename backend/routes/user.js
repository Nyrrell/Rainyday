import CryptoJS from "crypto-js";
import User from "../models/User.js";

async function usersRoute(fastify, options) {

  // UPDATE USER
  fastify.put('/:id',
    {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send('Unauthorized');

      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
      }

      try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, { new: true });
        const { password, ...other } = updateUser.toJSON();
        res.status(200).send(other);
      } catch (e) {
        if (e.path === '_id') return res.status(500).send('Invalid user ID');
        res.status(500).send(e);
      }
    });

  //DELETE USER
  fastify.delete('/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user) // TODO ? "User delete"
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET USER
  fastify.get('/find/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');
      try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user.toJSON();
        res.status(200).send(other);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET ALL USERS
  fastify.get('/', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');
      const query = req.query.new;

      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(5)
          : await User.find();
        res.status(200).send(users);  // TODO PASSWORD ?
      } catch (e) {
        res.status(500).send(e);
      }
    });

  // GET USER STATS
  fastify.get('/stats', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

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

        res.status(200).send(data);
      } catch (e) {
        res.status(500).send(e);
      }
    });
}

export default usersRoute;