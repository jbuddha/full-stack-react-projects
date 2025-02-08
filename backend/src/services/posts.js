import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

export async function getPostById(id) {
  return await Post.findById(id)
}

export async function updatePost(userId, id, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: id, author: userId },
    {
      $set: {
        title,
        author: userId,
        contents,
        tags,
      },
    },
    { new: true },
  )
}

export async function deletePost(userId, id) {
  return await Post.deleteOne({ _id: id, author: userId })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

async function listPosts(query = {}, { sortBy = 'createdAt', sortOrder = 'descending' } = {}) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}
