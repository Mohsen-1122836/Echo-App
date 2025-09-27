import { Button, Input } from "@heroui/react";
import Comment from "./Card/Comment";
import Picture from "./Card/Picture";
import PostBody from "./Card/PostBody";
import PostFooter from "./Card/PostFooter";
import PostHeader from "./Card/PostHeader";
import { useContext, useState } from "react";
import {
  createCommentApi,
  getUserCommentsApi,
} from "../Services/commentService";
import { AuthContext } from "./AuthContext";
import CreatePost from "../Components/CreatePost";
import { useRef } from "react";
import { getAllPostsApi } from "../Services/PostService";

export default function PostCard({ post, length, callback }) {
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef(null);
  const { userData } = useContext(AuthContext);

  async function createComment(e) {
    e.preventDefault();
    setLoading(true);
    const response = await createCommentApi(commentContent, post.id);

    if (response.message) {
      setComments(response.comments);
      await callback();
      setCommentContent("");
    }
    setLoading(false);
  }

  async function getUserComments() {
    const response = await getUserCommentsApi(post.id);
    setComments(response.comments);
  }

  return (
    <>
      {isUpdating ? (
        <CreatePost
          post={post}
          callback={callback}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      ) : (
        <div className="bg-white dark:text-black w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
          <div className="w-full h-16 items-center flex justify-between ">
            <PostHeader
              photo={post?.user?.photo}
              name={post?.user?.name}
              date={post?.createdAt}
            />
            {userData?._id === post?.user?._id && (
              <Picture
                setIsUpdating={setIsUpdating}
                postId={post.id}
                callback={callback}
              />
            )}
          </div>

          <PostBody
            body={post?.body}
            image={post?.image}
            name={post?.user?.name}
          />

          <PostFooter
            postId={post.id}
            length={post.comments.length}
            inputRef={inputRef}
          />
          {comments.length > 0 &&
            comments
              .slice(0, length)
              .map((comment) => (
                <Comment
                  callback={getUserComments}
                  post={post}
                  key={comment._id}
                  photo={post?.user?.photo}
                  name={comment.commentCreator?.name}
                  createdAt={comment.createdAt}
                  comment={comment}
                  postUserId={post.user?._id}
                />
              ))}

          <form
            onSubmit={createComment}
            className="flex items-center gap-2 py-4 w-full"
          >
            <Input
              ref={inputRef}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              variant="bordered"
              placeholder="Add a comment..."
              className="flex-1 text-sm sm:text-base"
            />
            <Button
              isLoading={loading}
              type="submit"
              disabled={commentContent.length < 2}
              className="bg-blue-500 text-white 
               text-xs sm:text-sm font-medium
               px-2 sm:px-4 py-1.5 sm:py-2 
               rounded-lg shadow-sm
               hover:bg-blue-600 transition"
            >
              <span className="block sm:hidden">Add</span>
              <span className="hidden sm:block">Add Comment</span>
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
