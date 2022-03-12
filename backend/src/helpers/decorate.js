import { existsSync, mkdirSync } from 'fs';
import multer from 'fastify-multer';
import mongoose from "mongoose";

export const authenticate = async (req, res) => {
  await req.jwtVerify().catch((err) => res.send(err));
};

export const isAdmin = async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));
};

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let path = req.url.replace("/api", 'media').toLowerCase();

    if (!req.params.id) {
      const id = mongoose.Types.ObjectId()
      path += `/${id}`;
      req.body = { _id: id}
    }
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replaceAll(' ', '_').toLowerCase();
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}.${extension}`);
  }
});

export const upload = multer({ storage: storage }).any();