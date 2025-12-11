import React, { useState } from "react";
import { uploadDocs } from "../../api/organizer";
import CreateOrganizerProfile from "./CreateOrganizerProfile";
import OrganizerEvents from "./OrganizerEvents";

export default function UploadDocs() {
  const [files, setFiles] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    files.forEach((f) => form.append("document", f));

    await uploadDocs(form);
    alert("Documents uploaded successfully!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Verification Documents</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles([...e.target.files])}
          className="w-full border p-2"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    
    </div>
    
  );
}
