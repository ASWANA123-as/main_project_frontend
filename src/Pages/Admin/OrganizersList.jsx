import React, { useEffect, useState } from "react";
import { getOrganizers, verifyOrganizer } from "../../api/admin";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
export default function OrganizersList() {
  const [organizers, setOrganizers] = useState([]);
  const [filter, setFilter] = useState("");

  const loadData = async () => {
    const res = await getOrganizers(filter);
    setOrganizers(res.data.data);
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handleAction = async (id, action) => {
    console.log(id,action ,'uuu')
    await verifyOrganizer(id, action);
    loadData();
  };

  return (
    <Layout>
       <div className="p-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Organizer Verification</h2>

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Verification Document</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map((org) => (
            <tr key={org._id} className="border-t">
              <td className="p-2">{org.user_id?.name}</td>
              <td>{org.user_id?.email}</td>
              <td className="capitalize">{org.verification_status}</td>
              <td className="p-2 max-w-[200px] truncate">
  {org.verification_docs?.[0]?.url ? (
    <a
      href={org.verification_docs[0].url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {org.verification_docs[0].url}
    </a>
  ) : (
    "Not uploaded"
  )}
</td>
              <td className="p-2">
                {org.verification_status === "pending" && (
                  <>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleAction(org._id, "approve")}
                    >
                      Approve
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(org._id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}

                {org.verification_status !== "pending" && (
                  <span className="text-sm text-gray-500">No Action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </Layout>
   
  );
}
