import z from 'zod'

export const orderSchema = z.object({
    email: z.string().email(),
    product: z.string(),
    quantity: z.number().min(1, {
        message: 'Quantity must be a positive number',
    }),
    totalPrice: z.number().min(0, {
        message: 'TotalPrice must be a positive number',
    }),
})