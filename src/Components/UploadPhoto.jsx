import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function UploadPhoto() {
  const { userData, setUserData } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", file);

    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        { headers: { token } }
      );

      if (data?.user?.photo) {
        setUserData({ ...userData, photo: data.user.photo });
      }

      setFile(null);
      setPreview("");
      setError("");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f) {
      if (f.size > 500 * 1024) {
        // 500 KB
        setError("Image size must be less than 500 KB");
        setFile(null);
        setPreview("");
        return;
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setError("");
    }
  }

  return (
    <div className="p-4">
      <label
        htmlFor="uploadImage"
        className="flex gap-1 cursor-pointer hover:text-blue-500 items-center"
      >
        <input
          type="file"
          accept="image/*"
          id="uploadImage"
          onChange={handleFileChange}
          className="hidden"
        />
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
        <span className="py-2">Image</span>
      </label>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-24 h-24 rounded-full object-cover my-2"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`px-4 py-2 rounded text-white ${
          !file || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
