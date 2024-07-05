import mongoose, { Schema } from "mongoose";

// Ensure process.env.MONGODB_URI is defined.

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODBI_URI environment variable is not defined");
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const blogSchema = new Schema(
  {
    title: String,
    category: String,
    image: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
