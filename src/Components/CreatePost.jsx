import { Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { createPostApi, updatePostApi } from "../Services/PostService"; // ✅ added updatePostApi

export default function CreatePost({
  callback,
  post,
  isUpdating,
  setIsUpdating,
}) {
  const [postContent, setPostContent] = useState(post ? post.body : "");
  const [postImage, setPostImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(post ? post.image : "");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      setPostContent(post.body);
      setImageUrl(post.image || "");
    }
  }, [post]);
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      // 500 KB
      setError("Image size must be less than 500 KB");
      setPostImage(null);
      setImageUrl("");
      e.target.value = "";
      return;
    }

    setPostImage(file);
    setImageUrl(URL.createObjectURL(file));
    setError("");
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("body", postContent);
    if (postImage) formData.append("image", postImage);

    let response;
    if (isUpdating && post?.id) {
      response = await updatePostApi(formData, post.id); // ✅ update
      setIsUpdating(false);
    } else {
      response = await createPostApi(formData); // ✅ create
    }

    if (response?.message) {
      await callback();
      setPostContent("");
      setImageUrl("");
      setPostImage(null);
    }

    setIsLoading(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 dark dark:text-gray-100   rounded-md shadow-md relative py-3 px-3 my-5 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="border dark:border-gray-700 border-gray-300  rounded-md p-2 w-full resize-none"
          rows="4"
          placeholder="What's on your mind?"
        />

        {imageUrl && (
          <div className="relative mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full object-cover rounded-md h-96"
            />
            <button
              type="button"
              onClick={() => {
                setImageUrl("");
                setPostImage(null);
              }}
              className="absolute top-4 right-4  size-6 rounded-full bg-white  cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <label
            htmlFor="postImage"
            className="flex gap-1 cursor-pointer hover:text-blue-500 items-center"
          >
            <input
              type="file"
              id="postImage"
              className="hidden"
              onChange={handleImage}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
       1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 0 0 
       1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 
       2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V9Zm.375 
       0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <span>Image</span>
          </label>

          <div className="flex gap-2">
            {isUpdating && (
              <Button onPress={() => setIsUpdating(false)} color="default">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              color="primary"
              isDisabled={!postContent.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
