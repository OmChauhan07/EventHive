import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPDebugPage = () => {
  const [users, setUsers] = useState([]);
  const [mockEmails, setMockEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearingEmails, setClearingEmails] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, emailsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/auth/debug/users'),
          fetch('http://localhost:5000/api/auth/debug/emails')
        ]);
        
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        if (!emailsResponse.ok) {
          throw new Error('Failed to fetch mock emails');
        }
        
        const usersData = await usersResponse.json();
        const emailsData = await emailsResponse.json();
        
        setUsers(usersData);
        setMockEmails(emailsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerifyUser = (email, otp) => {
    navigate('/verify-otp', { state: { email, debugOtp: otp } });
  };

  const handleClearEmails = async () => {
    try {
      setClearingEmails(true);
      const response = await fetch('http://localhost:5000/api/auth/debug/clear-emails', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear emails');
      }
      
      setMockEmails([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setClearingEmails(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">OTP Debug Page</h1>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="text-yellow-400 mb-4 p-4 bg-yellow-900/30 rounded-lg">
            <p className="font-medium">⚠️ This page is for development purposes only.</p>
            <p>It allows you to view and test OTP verification without email delivery.</p>
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-4">Registered Users</h2>
          
          {users.length === 0 ? (
            <p className="text-gray-400">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-sm text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">OTP</th>
                    <th className="px-6 py-3">Verified</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-700">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.otp || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {user.isVerified ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {!user.isVerified && user.otp && (
                          <button
                            onClick={() => handleVerifyUser(user.email, user.otp)}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Mock Emails</h2>
            <button
              onClick={handleClearEmails}
              disabled={clearingEmails || mockEmails.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
            >
              {clearingEmails ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Clearing...
                </>
              ) : (
                'Clear All Emails'
              )}
            </button>
          </div>
          
          {mockEmails.length === 0 ? (
            <p className="text-gray-400">No mock emails sent yet.</p>
          ) : (
            <div className="space-y-4">
              {mockEmails.map((email, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-300"><span className="text-gray-500">To:</span> {email.to}</p>
                      <p className="text-gray-300"><span className="text-gray-500">Subject:</span> {email.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(email.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="mt-2 p-3 bg-gray-900 rounded text-gray-300 whitespace-pre-wrap">
                    {email.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPDebugPage;