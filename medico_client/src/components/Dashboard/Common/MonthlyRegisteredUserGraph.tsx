import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 200 },
  { month: 'Apr', users: 278 },
  { month: 'May', users: 189 },
  { month: 'Jun', users: 239 },
  { month: 'Jul', users: 349 },
  { month: 'Aug', users: 200 },
  { month: 'Sep', users: 278 },
  { month: 'Oct', users: 189 },
  { month: 'Nov', users: 239 },
  { month: 'Dec', users: 349 },
];

const MonthlyRegisteredUsersGraph = () => {
  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-lg font-semibold mb-2 text-[#343A40]">Monthly Registered Users</h2>
      <div className="relative pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyRegisteredUsersGraph;