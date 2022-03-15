import { existsSync, mkdirSync } from 'fs';
import multer from 'fastify-multer';
import mongoose from "mongoose";

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