import React, { useEffect, useState } from "react";
import { getMyProfileAttandee } from "../../api/attandee";

const MyProfileAttandee = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMyProfileAttandee().then((res) => {
      setProfile(res.data);
    });
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl border border-gray-100">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-4xl font-bold">
            {profile.name?.charAt(0)}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1 tracking-wide">
            Attendee Information Summary
          </p>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">

          {/* Name */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {profile.user_id.name}
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm truncate w-full">Email Address</p>
            <p className="text-xl font-semibold text-gray-900 truncate w-full mt-1">
              {profile.user_id.email}
            </p>
          </div>

          {/* Preferences */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm truncate w-full">Event Preferences</p>
            <p className="text-lg font-medium text-gray-800 mt-1">
              {profile.preferences?.length > 0
                ? profile.preferences.join(", ")
                : "No preferences added"}
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm truncate w-full">Loyalty points</p>
            <p className="text-xl font-semibold text-gray-900 truncate w-full mt-1">
              {profile.loyalty_points}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfileAttandee;
