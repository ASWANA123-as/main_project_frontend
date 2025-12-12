import React, { useState } from "react";
import { uploadDocs } from "../../api/organizer";

export default function UploadDocs() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    files.forEach((f) => form.append("document", f));

    setUploading(true);
    try {
      await uploadDocs(form);
      alert("Documents uploaded successfully!");
      setFiles([]);
    } catch (err) {
      alert("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200 px-4 py-10"
    >
      <div className="bg-white w-full max-w-lg shadow-2xl rounded-xl p-8 border border-gray-200">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-wide">
          Upload Verification Documents
        </h2>

        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          Please upload clear and valid identification or verification documents.
          Supported formats include JPEG, PNG, and PDF files. You may upload multiple documents at once.
        </p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Documents
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="font-medium text-gray-700 mb-2">Files Selected:</p>
              <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition ${
              uploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload Documents"}
          </button>
        </form>
      </div>
    </div>
  );
}
