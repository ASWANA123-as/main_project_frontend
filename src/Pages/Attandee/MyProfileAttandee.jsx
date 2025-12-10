import React, { useEffect, useState } from "react";
import { getMyProfileAttandee } from "../../api/attandee";

const MyProfileAttandee = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMyProfileAttandee().then((res) => {
      setProfile(res.data.user_id);
    });
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Attendee Dashboard</p>
        </div>

        {/* Profile info */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Preferences</p>
            <p className="text-lg font-semibold text-gray-800">
              {profile.preferences?.length > 0
                ? profile.preferences.join(", ")
                : "No preferences added"}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfileAttandee;
