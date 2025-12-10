import React, { useEffect, useState } from "react";
import { getMyProfileAttandee, updatePreferences } from "../../api/attandee";
import { toast } from "react-toastify";

const preferenceOptions = [
  "Music",
  "Tech",
  "Business",
  "Sports",
  "Art",
  "Education",
  "Health",
  "Workshops",
];

export default function PreferencesPage() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user preferences
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await getMyProfileAttandee(); // GET /attendee/me
//         setSelected(res.data.preferences || []);
//       } catch (err) {
//         toast.error("Failed to load preferences");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);
useEffect(() => {
     getMyProfileAttandee().then((res) => {
        console.log(res,'iiii')
       setSelected(res.data.preferences || []);
   
     });
   }, []);
  // Handle checkbox toggle
  const togglePreference = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((pref) => pref !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  // Save preferences
  const savePreferences = async () => {
    setSaving(true);
    try {
      await updatePreferences({ preferences: selected }); // PATCH /preferences
      toast.success("Preferences updated successfully!");
    } catch (err) {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Preferences</h2>
      <p className="text-gray-600 mb-6">
        Select what type of events you are interested in. You can choose multiple.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {preferenceOptions.map((item) => (
          <label
            key={item}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
              selected.includes(item)
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => togglePreference(item)}
              className="mr-3"
            />
            <span className="font-medium">{item}</span>
          </label>
        ))}
      </div>

      <button
        onClick={savePreferences}
        disabled={saving}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 w-full"
      >
        {saving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
}
