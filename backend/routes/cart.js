import Cart from "../models/Cart.js";

async function cartRoute(fastify, options) {

  // CREATE CART
  fastify.post('/',
    {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      const newCart = new Cart(req.body);

      try {
        const cart = await newCart.save();
        res.status(200).send(cart)
      } catch (e) {
        res.status(500).send(e);
      }
    });

  // UPDATE CART
  fastify.put('/:id',
    {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const cart = await Cart.findByIdAndUpdate(
          req.params.id, {
            $set: req.body
          }, { new: true });

        res.status(200).send(cart);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //DELETE CART
  fastify.delete('/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send(cart) //TODO 'Cart delete'
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET USER CART
  fastify.get('/find/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const cart = await Cart.findOne({ userId: req.params.id }); //TODO VERIF FONCTIONNEMENT
        res.status(200).send(cart);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET ALL CARTS
  fastify.get('/', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const carts = await Cart.find();
        res.status(200).send(carts);
      } catch (e) {
        res.status(500).send(e);
      }
    });
}

export default cartRoute;