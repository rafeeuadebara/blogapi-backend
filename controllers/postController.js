import * as postModel from "../models/postModel.js";


export const listPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    return res.json(posts);
  } catch (err) {
    console.error("listPosts error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};


export const getPost = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.json(post);
  } catch (err) {
    console.error("getPost error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "title and content required" });
    }

    const post = await postModel.createPost(
      req.user.sub,
      title,
      content
    );

    return res.status(201).json(post);
  } catch (err) {
    console.error("createPost error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await postModel.updatePost(
      req.params.id,
      req.user.sub,
      title,
      content
    );

    if (!post) return res.status(403).json({ error: "Not allowed" });

    return res.json(post);
  } catch (err) {
    console.error("updatePost error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const ok = await postModel.deletePost(
      req.params.id,
      req.user.sub
    );

    if (!ok) return res.status(403).json({ error: "Not allowed" });

    return res.json({ success: true });
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};
