export const isAdmin = async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));
};