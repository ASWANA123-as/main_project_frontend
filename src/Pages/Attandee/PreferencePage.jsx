import React, { useEffect, useState } from "react";
import { getMyProfileAttandee, updatePreferences } from "../../api/attandee";

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
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getMyProfileAttandee().then((res) => {
      setSelected(res.data.preferences || []);
    });
  }, []);

  const togglePreference = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((pref) => pref !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      await updatePreferences({ preferences: selected });
      setShowModal(true);

      // Optional: auto-close modal after 3 seconds
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      console.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* PAGE UI */}
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

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center transform animate-scaleIn">

            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Preferences Saved!
            </h3>
            <p className="text-gray-700 mb-6">
              Your event preferences have been updated successfully.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tailwind animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
