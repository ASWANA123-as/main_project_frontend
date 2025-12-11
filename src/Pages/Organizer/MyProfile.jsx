import React, { useEffect, useState } from "react";
import axios from "../../api/AxiosInstance";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/organizer/me");
      console.log(res.data,'uuu')
      setProfile(res.data.data || res.data.profile || res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/organizer/update-profile", profile);
      alert("Profile updated successfully");
      setProfile(res.data.organizer || res.data.data);
      setEditMode(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-xl">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Organizer Profile</h1>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Display Mode */}
        {!editMode && (
          <div className="grid grid-cols-1 gap-6">

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium text-gray-800">{profile.user_id.name || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total events</p>
              <p className="text-lg font-medium text-gray-800">{profile.total_events
 || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Organization Name</p>
              <p className="text-lg font-medium text-gray-800">
                {profile.organization_name || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Bio</p>
              <p className="text-gray-800">{profile.bio || "No bio added"}</p>
            </div>

            {/* Verification Status */}
            <div>
              <p className="text-sm text-gray-500">Verification Status</p>
              <span
                className={`mt-1 inline-block px-4 py-1 rounded-full text-sm 
                ${
                  profile.verification_status === "approved"
                    ? "bg-green-100 text-green-700"
                    : profile.verification_status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {profile.verification_status}
              </span>
            </div>

          </div>
        )}

        {/* Edit Mode */}
        {editMode && (
          <form onSubmit={updateProfile} className="space-y-6">

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="fullname"
                value={profile.fullname || ""}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={profile.phone || ""}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Organization Name</label>
              <input
                name="organization_name"
                value={profile.organization_name || ""}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg mt-1"
                rows="4"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg w-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
