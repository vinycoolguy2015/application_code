import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/')
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const imageFilter = function (req: any, file: Express.Multer.File, cb: any) {
  if (!file.originalname.match(/\.(png|PNG)$/)) {
    req.fileValidationError = 'Only png images are allowed!'
    return cb(new Error('Only png images are allowed!'), false)
  }
  return cb(null, true)
}
