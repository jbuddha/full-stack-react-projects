import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'
import { useAuth } from '../contexts/AuthContext'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),
    onSuccess: () => {
      setTitle('')
      setContents('')
      queryClient.invalidateQueries(['posts'])
    },
  })

  if (!token) {
    return <div id='login-to-post'>Please login to create new posts</div>
  }

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
