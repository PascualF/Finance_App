import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const port = process.env.PORT || 4000;

const app = express();
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());


app.get('/api/transactions', async (req, res) => {
  const response = await prisma.transaction.findMany()
  res.json(response)
});

app.post('/api/transactions', async (req, res) => {
  const { title, amount, category, type} = req.body.transaction
  const transaction = await prisma.transaction.create({
    data: {
      title: title,
      amount: amount,
      category: category,
      type: type
    }
  })
  res.json(transaction)
})

app.delete('/api/transactions/:id', async (req, res) => {
  console.log(req.params)
  const {id} = req.params
  const idToNumber = Number(id)
  const deleteTransaction = await prisma.transaction.delete({
    where: {
      id: idToNumber
    }
  })
  res.json(deleteTransaction)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});