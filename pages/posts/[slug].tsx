import React from 'react'
import { getSinglePost, getAllPosts } from '@/lib/notionAPI'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({slug}:any) => {
    return {params:{slug}}
  })

  return {
    paths: paths,
    fallback:"blocking",
  }
}

export const getStaticProps = async ({params}:any) => {
  const post = await getSinglePost(params.slug)

  return {
    props: {
      post,
    },
    revalidate:60*60*6,
  }
}

const Post = ({post}:any) => {
  return (
    <main className="container w-full mt-16 flex flex-col items-center">
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-quto mt-20">
      <h2 className="w-full text-2xl font-medium">{ post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">PostedDate_at:{post.metadata.date}</span>
      <br />
        {post.metadata.tags.map((tag: string, index: number) => (
        <Link key={index} href={`/posts/tag/${tag}/page/1`}>
          <p className='text-white bg-sky-900 rounded-xl mt-2 mr-1 px-2 inline-block'>
            {tag}
          </p>
        </Link>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
            }
          }} >
          {post.markdown.parent}
        </ReactMarkdown>
        <Link href="/">
          <div className="pb-10">←ホームに戻る</div>
        </Link>
      </div>
      </section>
    </main>
  )
}

export default Post
