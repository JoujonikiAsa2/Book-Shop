
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { bookRoute } from './app/module/products/book.route'
import { orderRoute } from './app/module/order/order.route'
import globalErrorHandler from './app/config/error.middleware'
const app:Application = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api/products', bookRoute)
app.use('/api/orders', orderRoute)

//home route for the application
app.get('/', (req: Request,res: Response) =>{
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    })
})

app.use(globalErrorHandler)

export default app