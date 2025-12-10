import React, { useState } from "react";
import { createProfile } from "../../api/organizer";
import Layout from "../../components/Layout";
export default function CreateOrganizerProfile() {
  const [bio, setBio] = useState("");
  const [organization, setOrganization] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await createProfile({ bio, organization });
    alert("Profile created successfully!");
  };

  return (
    <Layout>
       <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Organizer Profile</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
    </Layout>
   
  );
}
