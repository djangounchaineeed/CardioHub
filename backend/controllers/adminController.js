import jwt from 'jsonwebtoken'
import articleModel from '../models/articleModel.js';

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: error.message })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const aToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, aToken })
        } else {
            res.status(401).json({ success: false, message: 'invalid credentials' })
        }
    } catch (error) {
        console.error(error)
    }
}

export const addArticle = async (req, res) => {
    try {
        const { title, category, video, body } = req.body;

        if (!title || !category || !body) {
            return res.status(400).json({ message: "Title, category, and body are required" });
        }

        const newArticle = new articleModel({
            title,
            category,
            video,
            body,
            date: new Date()
        });

        await newArticle.save();

        res.status(201).json({ message: "Article added successfully", article: newArticle });
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const getAllArticles = async (req, res) => {
    try {
        // Виконуємо запит до бази даних для отримання всіх статей
        const articles = await articleModel.find();

        // Повертаємо статті у відповіді
        res.status(200).json({ articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getSingleArticle = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the article by ID from the database
        const article = await articleModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ article });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the article by ID and update it with the new data
        const updatedArticle = await articleModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the article by ID and delete it
        const deletedArticle = await articleModel.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully', article: deletedArticle });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

