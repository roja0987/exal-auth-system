import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/'); // Redirect to login if not authenticated
      } else {
        setUser(session.user);
      }
    };
    getSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome, {user?.email}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition">
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Requirement: Manage Login Methods */}
          <div className="border rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Security & Login Methods</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Password + OTP (SMS)</span>
                <button className="text-indigo-600 text-xs font-bold hover:underline">CONFIGURE</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Login via OTP Only</span>
                <button className="text-indigo-600 text-xs font-bold hover:underline">ENABLE</button>
              </div>
            </div>
          </div>

          {/* User Info / GDPR Data Management */}
          <div className="border rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>User ID:</strong> <span className="text-xs font-mono">{user?.id}</span></p>
              <p className="text-xs italic text-gray-400 mt-4">Note: Your data is stored securely in compliance with GDPR guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}