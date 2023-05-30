import React from 'react'
import Link from "next/link"

type Props = {
  title: string;
  description: string;
  date: string;
  tag: string;
  slug: string;
  isPaginationPage: boolean;
}

const SinglePost = ({post}:any,{isPaginationPage}:any) => {
  return (
    <section className='lg:w-full  bg-sky-900 mb-8 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transision-all duration-300'>
      {isPaginationPage ? (
        <>
          <div className="flex gap-4 items-center justify-start">
            <Link href={`/posts/${post.slug}`}>
              <h2 className='text-gray-100 text-2xl font-medium mb-2'>{post.title}</h2>
            </Link>
            <div className='text-gray-100'>{post.date}</div>
            {post.tags.map((tag: any,index:number) => (
                <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                  <div  className='cursor-pointer mb-2 mx-2 text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium'>
                    {tag}
                  </div>
                </Link>
            ))}
          </div>
          <p className='text-gray-100'>{post.description}</p>
        </>
      ) : (
        <>
          <div className="flex gap-4 items-center justify-start">
            <Link href={`/posts/${post.slug}`}>
              <h2 className='text-gray-100 text-2xl font-medium mb-2'>{post.title}</h2>
            </Link>
            <div className='text-gray-100 mb-2'>{post.date}</div>
            <div className="flex flex-row items-center gap-2 mb-2">
                {post.tags.map((tag: any,index:number) => (
                  <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                    <span key={tag} className='cursor-pointer text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium'>
                      {tag}
                    </span>
                  </Link>
              ))}
                </div>
          </div>
          <p className='text-gray-100'>{post.description}</p>
        </>
      )}
    </section>
  )
}

export default SinglePost
