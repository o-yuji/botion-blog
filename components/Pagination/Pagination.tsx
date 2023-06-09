import React from 'react'
import Link from 'next/link'
import { getPageLink } from '@/lib/blog-helper';

interface Props{
  numberOfPage: number;
  tag:string,
}

const Pagination = (props: Props) => {
  const { numberOfPage,tag } = props;
  let pages:number[] = [];
  for (let i = 1; i <= numberOfPage;i++){
    pages.push(i);
  }
  return (
    <section className="bm-8 lg:w-1/2 ax-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => {
          return (
            <li key={page} className="bg-sky-900 rounded-lg w-6 h-8 relative">
              {/* <Link href={`/posts/page/${page}`} */}
              <Link href={getPageLink(tag,page)}
                className="text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">
                {page}
              </Link>
            </li>
          )}
        )}
      </ul>
    </section>
  )
}

export default Pagination
