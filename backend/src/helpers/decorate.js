import { existsSync, mkdirSync } from 'fs';
import multer from 'fastify-multer';

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
    const path = req.url.replace("/api", 'media');
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
    callback(null, path);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replaceAll(' ', '_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}.${extension}`);
  }
});

export const upload = multer({ storage: storage }).any();