## 1-Book Shop API
This is a backend application for managing a bookshop and is built with Node.js, Express.js, TypeScript, and MongoDB. It enables book management, order placement, and revenue tracking. It also includes some exciting features, such as search and filtering. It also allows searching by category.

[Live Link](https://batch-4-assignment-2-set-1.vercel.app/)


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
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```
5. Start the local Server:
```bash
npm run start:dev
```
6. Test the API
[http://localhost:5000/](http://localhost:5000/)