import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { uploadUserPhotoApi } from "../Services/userService";

export default function ProfilePhoto({ userToken, callback }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    const response = await uploadUserPhotoApi(file, userToken);
    setLoading(false);

    if (response?.message === "success") {
      if (callback) await callback(); // refresh user data after upload
      setFile(null);
    }
  }

  return (
    <div className="bg-white rounded-md shadow-md p-4 w-full max-w-sm">
      <h3 className="font-semibold mb-3">Upload Profile Photo</h3>

      {/* File input */}
      <label
        htmlFor="profilePhoto"
        className="flex gap-2 items-center cursor-pointer text-blue-600 hover:underline"
      >
        <input
          type="file"
          id="profilePhoto"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        Choose Photo
      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-3 relative">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>
      )}

      {/* Upload button */}
      <div className="mt-4 flex gap-2">
        <Button
          onPress={handleUpload}
          disabled={!file || loading}
          className="bg-blue-500 text-white"
        >
          {loading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </div>
    </div>
  );
}
