import React, { useEffect, useState } from "react";
import axios from "../../api/AxiosInstance"; // your axios instance with token attached

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/organizer/me");
      setProfile(res.data.data || res.data.profile || res.data); // adjust to your backend
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
        ❌ {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Organizer Profile</h1>

      <form onSubmit={updateProfile} className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={profile.fullname || ""}
            onChange={handleInput}
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleInput}
            className="w-full p-3 border rounded-lg mt-1"
          />
        </div>

        {/* Organization Name */}
        <div>
          <label className="text-sm font-medium">Organization Name</label>
          <input
            type="text"
            name="organization_name"
            value={profile.organization_name || ""}
            onChange={handleInput}
            className="w-full p-3 border rounded-lg mt-1"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm font-medium">Bio / About</label>
          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleInput}
            className="w-full p-3 border rounded-lg mt-1"
            rows="4"
            placeholder="Write something about yourself"
          />
        </div>

        {/* Status Display */}
        <div className="mt-3">
          <p className="text-gray-700 text-sm">Verification Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
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

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
