import express, { Express } from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import { UploadResult, imageFilter, storage } from './utilities'

const config = require('config')

const serviceConfig = config.get('service.service')
const baseUrl = "/api"
const corsOptions = {
 origin: 'http://localhost:3000',
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors(corsOptions))

app.get(`${baseUrl}/status`, async (req: express.Request, res: express.Response) => {
  return res.status(200).send('Alive')
})

app.post(`${baseUrl}/images`, async (req: express.Request, res: express.Response) => {
  let upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: imageFilter }).array('images', 10)

  upload(req as any, res, async (err) => {
    let result: UploadResult[] = []
    if ((req as any).fileValidationError) {
      return res.status(400).send((req as any).fileValidationError)
    } else if (err instanceof multer.MulterError) {
      return res.status(500).send(err)
    } else if (err) {
      return res.status(500).send(err)
    }

    for (const file of req.files as Express.Multer.File[]) {
      result.push({ id: path.parse(file.filename).name, filename: file.originalname })
    }
    res.status(200).send(result)
  })
})

app.get(`${baseUrl}/images`, async (req: express.Request, res: express.Response) => {
  const id = req.query.id as string[]
  try {
    const content = fs.readFileSync(`./static/${id}.png`)
  } catch (error) {
    res.status(500).send({
     error: error.message})
  }
  res.status(200).sendFile(path.resolve(`./static/${id}.png`))
})

app.listen(serviceConfig.port, () => {
  console.log(`Image API listening on port ${serviceConfig.port}`)
})
