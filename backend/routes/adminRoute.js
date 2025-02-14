import express from 'express'
import { addArticle, deleteArticle, getAllArticles, getSingleArticle, loginAdmin, updateArticle } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-post', addArticle);
adminRouter.get('/articles', getAllArticles);
adminRouter.get('/articles/:id', getSingleArticle);
adminRouter.put('/articles/:id', updateArticle);
adminRouter.delete('/articles/:id', deleteArticle);


export default adminRouter