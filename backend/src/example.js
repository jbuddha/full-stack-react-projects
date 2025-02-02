import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

initDatabase()

const post = new Post({
  title: 'Hello Mongoose',
  author: 'Jyothi Buddha',
  contents: 'This post is stored in MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

await post.save()
const posts = await Post.find()
console.log(posts)
