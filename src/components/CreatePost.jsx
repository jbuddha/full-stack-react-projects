import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'

export function CreatePost() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => {
      setAuthor('')
      setTitle('')
      setContents('')
      queryClient.invalidateQueries(['posts'])
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createPostMutation.mutate()
      }}
    >
      <h2>Create Post</h2>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createPostMutation.isPending}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={createPostMutation.isPending}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        disabled={createPostMutation.isPending}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully
        </>
      ) : null}
    </form>
  )
}
