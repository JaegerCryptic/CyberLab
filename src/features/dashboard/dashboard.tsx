import  Sidebar  from '../../common/components/sidebar/sidebar.tsx' // This is importing the sidebar that i am currently trying to work on.
import  TopBar  from '../../common/components/header/header.tsx' // same story with the header/topbar 
import  React from 'react'



// DASHBOARD
const Dashboard: React.FC = () => {
    return (
      <div className="dashboard">
        <TopBar />
        <div className="dashboard-content">
          <Sidebar />
          <div className="content">
            <h1>Dashboard Content</h1>
            {/*  insert the rest of the games here i suppose. */}
          </div>
        </div>
      </div>
    );
  };


export default Dashboard;