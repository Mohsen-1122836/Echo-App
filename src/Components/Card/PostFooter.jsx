import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillLike } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiShareForwardFill } from 'react-icons/ri';

export default function PostFooter({ length, postId , inputRef }) {

  const [reaction, setReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  

  return (
    <>
      <div className="w-full h-8 flex items-center px-3 my-3">
        <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
          <svg
            className="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
        </div>
        <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
          <svg
            className="w-3 h-3 fill-current stroke-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="w-full flex justify-between">
          <p className="ml-3 text-gray-500"></p>
          <p className="ml-3 text-gray-500">
            <Link to={`/post/${postId}`}>{length} {length < 2 ? "Comment" : "Comments"}</Link>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full px-2 sm:px-5 border-t border-divider pt-3 my-2 text-sm sm:text-base">
  <div className="relative group">
    <button className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3">
      {reaction === "like" ? (
        <div className="flex items-center gap-1 sm:gap-2">
          <AiFillLike className="text-blue-600 pe-0.5" size={28} />
          <span className="font-semibold text-gray-600">Like</span>
        </div>
      ) : reaction === "love" ? (
        <div className="flex items-center gap-1 sm:gap-2">
          <AiFillHeart className="text-red-600" size={28} />
          <span className="font-semibold text-gray-600">Love</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2 hover:**:text-blue-600">
          <AiFillLike className="text-gray-500 pe-0.5" size={28} />
          <span className="font-semibold text-gray-600">Like</span>
        </div>
      )}

      
      <div
        className={`absolute -top-11 left-1/2 -translate-x-1/2 gap-3 bg-white shadow-md rounded-full px-3 py-2 z-50 max-w-[90vw] sm:max-w-none
          ${showReactions ? "flex" : "hidden"} group-hover:flex`}
      >
        <div
          onClick={() => {
            setReaction("like");
            setShowReactions(false);
          }}
          className="cursor-pointer hover:scale-125 transition"
        >
          <AiFillLike className="text-blue-600" size={28} />
        </div>
        <div
          onClick={() => {
            setReaction("love");
            setShowReactions(false);
          }}
          className="cursor-pointer hover:scale-125 transition"
        >
          <AiFillHeart className="text-red-600" size={28} />
        </div>
      </div>
    </button>
  </div>

  <button
    onClick={() => inputRef?.current?.focus()}
    className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3 hover:**:text-blue-600"
  >
    <FaRegComment className="text-gray-600 hover:text-bg-blue-600" size={28} />
    <span className="">Comment</span>
  </button>

  <button
  onClick={() => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    const shareData = {
      title: "Check this post",
      text: "Look at this post I found!",
      url: shareUrl,
    };

    if (navigator.share) {
      // ✅ Mobile & modern browsers
      navigator.share(shareData).catch((err) => console.log("Share canceled", err));
    } else {
      // ✅ Fallback for desktop
      navigator.clipboard.writeText(shareUrl);
      alert("Post link copied to clipboard!");
    }
  }}
  className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-3 hover:**:text-blue-600"
>
  <RiShareForwardFill className="text-gray-600" size={28} />
  <span className="font-semibold text-gray-600">Share</span>
</button>

</div>

    </>
  );
}


