import Head from "next/head"
import { getAllPosts,getPostsForTopPage,getAllTags } from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Link from "next/link";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants"
import Tag from "../components/Tag/Tag"

export const getStaticProps = async () => {
  // const allPosts = await getAllPosts();
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE);
  const allTags = await getAllTags();
  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate:10,
  }
}

export default function Home({ fourPosts,allTags }:any) {
  // console.log(allPosts)
  return (
    <div className="container h-full w-full mx-auto font-mono text">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16 flex flex-col items-center">
        <h1 className="text-5xl font-medium text-center mb-16">
          NotionBlog🚀
        </h1>
        {fourPosts.map((post: any) => (
          <SinglePost key={post.id} post={post} isPaginationPage={false} />
        ))}
        <Link href="/posts/page/1" className="m-4 mx-auto px-5 block text-right">...もっと見る</Link>
        <Tag tags={allTags} />
      </main>

    </div>
  )
}
