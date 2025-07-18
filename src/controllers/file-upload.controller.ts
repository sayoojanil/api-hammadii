import {
  post,
  Request,
  Response,
  RestBindings,
  requestBody,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({storage: storage});

export class FileUploadController {
  @post('/upload', {
    responses: {
      '200': {
        description: 'File uploaded',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async upload(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      upload.single('file')(req, res, err => {
        if (err) return reject(err);
        if (!req.file) return reject(new Error('No file uploaded'));
        resolve({
          filename: req.file.filename,
          path: '/uploads/' + req.file.filename,
        });
      });
    });
  }
}
