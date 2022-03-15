export const authenticate = async (req, res) => {
  await req.jwtVerify().catch((err) => res.send(err));
};