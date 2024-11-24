## 1-Book Shop API
This is a backend application for managing a bookshop and is built with Node.js, Express.js, TypeScript, and MongoDB. It enables book management, order placement, and revenue tracking. It also includes some exciting features, such as search and filtering. It also allows searching by category.

[Live Link](https://batch-4-assignment-2-set-1.vercel.app/)


## Table of Contents
1. Feature
2. Technologies
3. Getting Started Locally
4. API Endpoints
  

## Features
1. CRUD Operation for Books
   - Add, Restrive, update, and Delete Book.
   - Retrieve specific books by ID.
2. Filtering
   - Search with a searchTerm query parameter.
   - Support for partial and case-insensitive searches. 
3. Order Placement
   - Place an Order and update the inventory automatically.
4. Revenue Tracking
   - Aggregates total revenue from all orders.
5. Validation
   - Strong validation for request bodies using Zod and Mongoose
  

## Technologies
- Node.js
- Express.js.
- MongoDB
- Mongoose
- TypeScript


## Getting Started Locally
1. Clone this repository to your local machine:
```bash
git clone https://github.com/JoujonikiAsa2/Book-Shop.git
```
2. Move to the cloned directory
```bash
cd Book-Shop
```
3. Install Dependencies
```bash
npm i
```
4. Configure Environment Variables
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.ghkhwep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
5. Start the local Server:
```bash
npm run dev
```
6. Test the API
[http://localhost:5000/](http://localhost:5000/)


## API Endpoints

### Book Management

<table>
   <thead>
      <tr>
         <th>HTTP Method</th>
         <th>EndPoints</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
     <tr>
         <td>POST</td>
         <td>/api/products</td>
         <td>Allows you to create a new book by sending the book details in the request body</td>
      </tr>
      <tr>
         <td>GET</td>
         <td>/api/products</td>
         <td>Retrieves a list of all books in the database.</td>
      </tr>
      <tr>
         <td>GET</td>
         <td>/api/products/:productId</td>
         <td>Fetches the details of a specific book using its unique product ID</td>
      </tr>
      <tr>
         <td>PUT</td>
         <td>/api/products/:productId</td>
         <td>Updates the information of an existing book identified by its product ID</td>
      </tr>
      <tr>
         <td>DELETE</td>
         <td>/api/products/:productId</td>
         <td>Deletes a specific book from the database using its product ID. This action removes the selected book permanently from the inventory</td>
      </tr>

   </tbody>
</table>

### Order Management
<table>
   <thead>
      <tr>
         <th>HTTP Method</th>
         <th>EndPoints</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
     <tr>
         <td>POST</td>
         <td>/api/orders</td>
         <td>Allows you to create a new order by sending the order details in the request body</td>
      </tr>
      <tr>
         <td>GET</td>
         <td>/api/orders/revenue</td>
         <td>Retrieves the total revenue generated from all orders</td>
      </tr>

   </tbody>
</table>
