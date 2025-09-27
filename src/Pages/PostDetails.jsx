import { useParams } from "react-router-dom";
import { getSinglePostApi } from "../Services/PostService";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import LoadingScreen from "../Components/LoadingScreen";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function getPost() {
    const response = await getSinglePostApi(id);

    if (response.message) {
      setPost(response.post);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="dark:bg-gray-900 container mx-auto px-4 min-h-screen flex  justify-center">
        <div className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-3/5 h-full">
          {post ? (
            <PostCard
              post={post}
              length={post.comments.length}
              callback={getPost}
            />
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </>
  );
}
