import Order from "../models/Order.js";

async function orderRoute(fastify) {

  // CREATE ORDER
  fastify.post('/',
    {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      const newOrder = new Order(req.body);

      try {
        const order = await newOrder.save();
        res.status(200).send(order)
      } catch (e) {
        res.status(500).send(e);
      }
    });

  // UPDATE ORDER
  fastify.put('/:id',
    {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const order = await Order.findByIdAndUpdate(
          req.params.id, {
            $set: req.body
          }, { new: true });

        res.status(200).send(order);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //DELETE ORDER
  fastify.delete('/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(order) //TODO 'Order delete'
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET USER ORDERS
  fastify.get('/find/:id', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const order = await Order.find({ userId: req.params.id });
        res.status(200).send(order);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET ALL ORDERS
  fastify.get('/', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

      try {
        const orders = await Order.find();
        res.status(200).send(orders);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  //GET MONTHLY INCOME
  fastify.get('/stats', {
      preValidation: [fastify.authenticate]
    },
    async (req, res) => {
      if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

      const productId = req.query.pid;
      const date = new Date();
      const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
      const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

      try {
        const income = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: previousMonth },
              ...(productId && {
                products: { $elemMatch: { productId } },
              }),
            },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales:"$amount"
            }
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" }
            }
          }
        ]);

        res.status(200).send(income);
      } catch (e) {
        res.status(500).send(e);
      }
    });
}

export default orderRoute;