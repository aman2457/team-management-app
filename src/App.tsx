import React from 'react';
import './App.css';
import TeamMemberList from './components/TeamMemberList/TeamMemberList';

function App() {
  return (
    <div className="min-h-screen bg-white-100 text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-4">
          <TeamMemberList />
        </div>
      </main>
    </div>
  );
}

export default App;
