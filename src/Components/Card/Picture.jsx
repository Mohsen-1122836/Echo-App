import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@heroui/react";
import { DeleteCommentApi } from "../../Services/commentService";
import { useState } from "react";
import { deletePostApi } from "../../Services/PostService";

export default function Picture({ commentId, callback, setIsUpdating, postId, onEdit }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    let response;

    if (postId) {
      // 🔴 Delete Post
      response = await deletePostApi(postId);
      await callback();
    } else if (commentId) {
      // 🔴 Delete Comment
      response = await DeleteCommentApi(commentId);
      await callback();
    }

    if (response?.message) {
      await callback();
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <svg
              className="w-16 cursor-pointer outline-0"
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
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
          </DropdownTrigger>

          <DropdownMenu aria-label="Actions">
            {/* 🔹 If editing post, use setIsUpdating */}
            {setIsUpdating && (
              <DropdownItem onClick={() => setIsUpdating(true)} key="edit-post">
                Edit Post
              </DropdownItem>
            )}

            {/* 🔹 If editing comment, use onEdit */}
            {onEdit && (
              <DropdownItem onClick={onEdit} key="edit-comment">
                Edit Comment
              </DropdownItem>
            )}

            <DropdownItem
              onClick={handleDelete}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
