
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/config/error.middleware'
import router from './app/routes'
const app:Application = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api', router)

//home route for the application
app.get('/', (req: Request,res: Response) =>{
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    })
})

app.use(globalErrorHandler)

export default app