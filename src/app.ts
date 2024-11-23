
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/module/products/product.route'
const app:Application = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api/products', productRoute)

//home route for the application
app.get('/', (req: Request,res: Response) =>{
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    })
})

export default app