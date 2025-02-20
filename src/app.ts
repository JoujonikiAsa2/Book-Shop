import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'
const app: Application = express()

//middlewares
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ['https://book-shop-frontend-three.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
)
app.use('/api', router)

//home route for the application
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'The application is running successfully 🚀',
  })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
