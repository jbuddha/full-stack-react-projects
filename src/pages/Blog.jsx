import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostList } from '../components/PostList.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { getPosts } from '../api/posts.js'
import { Header } from '../components/Header.jsx'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

export function Blog({ initialData }) {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
    initialData,
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Basics & Beyond Blog</title>
      </Helmet>
      <Header />
      <br />
      <hr />
      <br />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' value={author} onChange={(value) => setAuthor(value)} />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}

Blog.propTypes = {
  initialData: PropTypes.shape(PostList.propsTypes),
}
