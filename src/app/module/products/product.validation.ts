import z from 'zod'

const productSchema = z
  .object({
    title: z.string({
      message: 'Title must be a string',
    }),
    author: z.string({
      message: 'Auhtor must be a string',
    }),
    price: z.number({
      message: 'Price must be a positive number',
    }),
    category: z.enum(
      ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      {
        required_error:
          'Category must be Fiction or Science or SelfDevelopment or Poetry or Religious',
      },
    ),
    description: z.string({
      required_error: 'Description must be a string',
    }),
    quantity: z.number({
      required_error: 'Quantity must be a positive number',
    }),
    inStock: z.boolean({
      required_error: 'InStock must be a boolean number',
    }),
  })

export default productSchema
