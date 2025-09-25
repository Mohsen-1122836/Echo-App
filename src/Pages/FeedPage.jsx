import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/PostService";
import LoadingScreen from "../Components/LoadingScreen";
import CreatePost from "../Components/CreatePost";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const response = await getAllPostsApi();
    setPosts(response.posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-6">

        <div className="w-full max-w-2xl space-y-6">
  <CreatePost callback={getAllPosts} />
  {posts.length === 0 ? (
    <LoadingScreen />
  ) : (
    posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        length={1}
        postId={post.id}
        callback={getAllPosts}
      />
    ))
  )}
</div>
      </div>
    </>
  );
}
