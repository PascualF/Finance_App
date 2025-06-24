import { Router } from 'express'
import multer from 'multer'
import { fileUpload } from '../controllers/fileUploadController'
import { authenticateToken } from '../middleware/authMiddleware';
const router = Router()
const upload = multer({dest: 'uploads/'})

router.post("/upload", authenticateToken, upload.single('fileCSV'), fileUpload)

export default router;