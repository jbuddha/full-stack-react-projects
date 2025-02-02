import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import { createPost, listAllPosts, listPostsByAuthor, listPostsByTag } from '../services/posts.js'
import { Post } from '../db/models/post.js'

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Test Mongoose!',
      author: 'Jyothi Buddha',
      contents: 'This post is stored from a test in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('creating a post without title should fail', async () => {
    const post = {
      author: 'Jyothi Buddha',
      contents: 'This should not be saved',
      tags: ['failure'],
    }

    try {
      await createPost(post)
      throw Error('An error should have been thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe('list posts', () => {
  test('list all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('list by tag', async () => {
    const posts = await listPostsByTag('react')
    expect(posts.length).toEqual(2)
  })

  test('list by author', async () => {
    const posts = await listPostsByAuthor('Reshma')
    expect(posts.length).toEqual(1)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort((a, b) => b.createdAt - a.createdAt)
    expect(posts.map((post) => post.createdAt)).toEqual(sortedSamplePosts.map((post) => post.createdAt))
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort((a, b) => a.updatedAt - b.updatedAt)
    expect(posts.map((post) => post.updatedAt)).toEqual(sortedSamplePosts.map((post) => post.updatedAt))
  })
})

const samplePosts = [
  { title: 'Learning Redux', author: 'Jyothi Buddha', tags: ['redux'] },
  { title: 'Learning React Hooks', author: 'Reshma', tags: ['react', 'hooks'] },
  { title: 'Learning Full Stack React', author: 'Rakesh', tags: ['react', 'nodejs'] },
  { title: 'Guide to typescript' },
]
