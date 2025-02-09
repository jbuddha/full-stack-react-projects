import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Post } from '../components/Post.jsx'
import PropTypes from 'prop-types'
import { getPostById } from '../api/posts.js'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'

export function ViewPost({ postId }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const post = postQuery.data

  return (
    <div style={{ padding: 8 }}>
      {post && (
        <Helmet>
          <title>{post.title} | Basics & Beyond Blog</title>
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to blog</Link>
      <br />
      <hr />
      {post ? <Post {...post} fullPost /> : <p>Post with id ${postId} not found</p>}
    </div>
  )
}

ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}
