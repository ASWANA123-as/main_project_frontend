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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526401485004-2aa7a50ccfa3?auto=format&fit=crop&w=1400&q=60')",
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/50 backdrop-blur-sm p-6 flex justify-center items-start">

        {/* Profile Card */}
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 mt-10 border border-gray-200">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
              Organizer Profile
            </h1>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
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
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {profile.user_id.name || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {profile.total_events || 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Organization Name</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {profile.organization_name|| "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-800 mt-1 leading-relaxed">
                  {profile.bio || "No bio added"}
                </p>
              </div>

              {/* Verification Status */}
              <div>
                <p className="text-sm text-gray-500">Verification Status</p>
                <span
                  className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-medium
                  ${
                    profile.verification_status === "approved"
                      ? "bg-green-100 text-green-800"
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

    {/* FIXED NAME UPDATE */}
    <div>
      <label className="text-sm font-medium">Full Name</label>
      <input
        value={profile.user_id?.name || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            user_id: {
              ...profile.user_id,
              name: e.target.value,
            },
          })
        }
        className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="text-sm font-medium">Organization Name</label>
      <input
        name="organization_name"
        value={profile?.organization_name || ""}
        onChange={handleInput}
        className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="text-sm font-medium">Bio</label>
      <textarea
        name="bio"
        value={profile?.bio || ""}
        onChange={handleInput}
        className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
        rows="5"
      />
    </div>

    <div className="flex gap-4">
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full transition"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={() => setEditMode(false)}
        className="bg-gray-300 text-gray-900 px-4 py-3 rounded-lg w-full hover:bg-gray-400 transition"
      >
        Cancel
      </button>
    </div>

  </form>
)}


        </div>
      </div>
    </div>
  );
}
