import * as postModel from "../models/postModel.js";

export const listPosts = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await postModel.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ error: "title and content required" });

  const post = await postModel.createPost(
    req.user.sub,
    title,
    content
  );

  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;

  const post = await postModel.updatePost(
    req.params.id,
    req.user.sub,
    title,
    content
  );

  if (!post) return res.status(403).json({ error: "Not allowed" });

  res.json(post);
};

export const deletePost = async (req, res) => {
  const ok = await postModel.deletePost(
    req.params.id,
    req.user.sub
  );

  if (!ok) return res.status(403).json({ error: "Not allowed" });

  res.json({ success: true });
};
