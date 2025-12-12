import React, { useEffect, useState } from "react";
import { getAnalytics } from "../../api/admin";
import Footer from "../../components/Footer";
import  Layout  from "../../components/Layout";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAnalytics().then(res => setStats(res.data.analytics));
  }, []);

  if (!stats) return <div className="text-center p-10">Loading...</div>;

  return (
    <Layout>
      <div class="flex flex-col space-y-6">
  
  <h1 class="text-3xl font-semibold">Admin Dashboard</h1>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-gray-500">Total Users</h3>
      <p class="text-3xl font-bold">{stats?.totalUsers}</p>
    </div>

    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-gray-500">Total Organizers</h3>
      <p class="text-3xl font-bold">{stats?.totalOrganizers}</p>
    </div>

    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-gray-500">Pending Verifications</h3>
      <p class="text-3xl font-bold text-orange-500">{stats?.pendingOrganizers}</p>
    </div>
    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-gray-500">Total events</h3>
      <p class="text-3xl font-bold ">{stats?.totalEvents}</p>
    </div>
    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-gray-500">completed events</h3>
      <p class="text-3xl font-bold text-green-500">{stats?.completedEvents}</p>
    </div>
  </div>

</div>

    </Layout>
   
  );
}
