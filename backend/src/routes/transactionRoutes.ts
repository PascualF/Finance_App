import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { getAllTransactions, addTransaction, deleteTransaction } from "../controllers/transactionController"
const router = Router()

router.get('/', authenticateToken, getAllTransactions)
router.post('/', authenticateToken,  addTransaction)
router.delete('/:id', authenticateToken, deleteTransaction)

export default router;