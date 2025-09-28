import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/PostService";
import LoadingScreen from "../Components/LoadingScreen";
import CreatePost from "../Components/CreatePost";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const loadPosts = useCallback(async (newPage = 1) => {
    setLoading(true);
    const response = await getAllPostsApi(newPage, 10); // 10 posts per page

    if (response?.posts?.length > 0) {
      if (newPage === 1) {
        setPosts(response.posts); // reset list
      } else {
        setPosts((prev) => [...prev, ...response.posts]); // append
      }
      setHasMore(response.posts.length >= 10);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts(1); // initial fetch
  }, [loadPosts]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const next = prevPage + 1;
            loadPosts(next);
            return next;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex justify-center px-4 py-6 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-6">
        <CreatePost callback={() => loadPosts(1)} />

        {posts.length === 0 && !loading ? (
          <LoadingScreen />
        ) : (
          <>
            {posts.map((post, index) => {
  if (index === posts.length - 1) {
    return (
      <div ref={lastPostRef} key={`${post.id}-${index}`}>
        <PostCard
          post={post}
          length={1}
          postId={post.id}
          callback={() => loadPosts(1)}
        />
      </div>
    );
  } else {
    return (
      <PostCard
        key={`${post.id}-${index}`}
        post={post}
        length={1}
        postId={post.id}
        callback={() => loadPosts(1)}
      />
    );
  }
})}


            {loading && (
              <LoadingScreen />
            )}
          </>
        )}
      </div>
    </div>
  );
}
