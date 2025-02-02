import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostList } from './components/PostList.jsx'
import { PostSorting } from './components/PostSorting.jsx'

const posts = [
  { title: 'Learning Redux', contents: 'State management', author: 'Jyothi Buddha', tags: ['redux'] },
  { title: 'Learning React Hooks', author: 'Reshma', tags: ['react', 'hooks'] },
  { title: 'Learning Full Stack React', author: 'Rakesh', tags: ['react', 'nodejs'] },
  { title: 'Guide to typescript' },
]

export function App() {
  // return <Post title='Full-Stack React Projects' contents="Let's become full-stack developers" author='Daniel Bugl' />
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
