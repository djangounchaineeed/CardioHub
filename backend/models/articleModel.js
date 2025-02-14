import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  video: { type: String, required: false },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Assuming you have a User model
});

const articleModel = mongoose.model('Article', articleSchema);

export default articleModel;