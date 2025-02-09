import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Post } from '../components/Post.jsx'
import PropTypes from 'prop-types'
import { getPostById } from '../api/posts.js'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { getUserInfo } from '../api/users.js'

export function ViewPost({ postId }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const post = postQuery.data
  const userInfoQuery = useQuery({
    queryKey: ['users', post?.author],
    queryFn: () => getUserInfo(post?.author),
    enabled: Boolean(post?.author),
  })
  const userInfo = userInfoQuery.data ?? {}

  return (
    <div style={{ padding: 8 }}>
      {post && (
        <Helmet>
          <title>{post.title} | Basics & Beyond Blog</title>
          <meta name='description' content={truncate(post.content)} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={post.title} />
          <meta property='og:article:published_time' content={post.createdAt} />
          <meta property='og:article:modified_time' content={post.updatedAt} />
          <meta property='og:article:author' content={userInfo.username} />
          {(post.tags ?? []).map((tag) => {
            ;<meta key={tag} property='og:article:tag' content={tag} />
          })}
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

function truncate(text, maxLength = 160) {
  return text?.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text
}

ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}
