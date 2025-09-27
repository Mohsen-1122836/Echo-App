import { useContext, useState } from "react";
import PostHeader from "./PostHeader";
import Picture from "./Picture";
import { AuthContext } from "../AuthContext";
import { updateCommentApi } from "../../Services/commentService";



export default function Comment({ comment, createdAt, postUserId, callback , post }) {
  const { userData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);



  

  async function handleUpdate() {
    if (!newContent.trim()) return;
    setLoading(true);
    const response = await updateCommentApi(comment._id, newContent);
    if (response.message) {
      await callback(); // refresh comments
      setIsEditing(false);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 -mx-3 bg-slate-200">
      <div className="w-full flex justify-between items-center">
        {/* ✅ Use commentator's data */}
        <PostHeader
          photo={post?.user?.photo}
          name={comment.commentCreator?.name}
          date={createdAt}
        />

        {userData._id === comment.commentCreator._id && userData._id === postUserId && (
          <Picture
            callback={callback}
            commentId={comment._id}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewContent(comment.content);
              }}
              className="px-2 py-1 bg-gray-300 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="p-2 ps-4 pb-0">{comment.content}</p>
      )}
    </div>
  );
}
