// Dashboard

import Menu from "../components/Menu";
import Dashboard from "../components/Dashboard";

import '../css/dashboard.css';

function DashboardPage() {    
  
  return (
    <div className="main">
      <Menu/>
      <Dashboard/>
    </div>
  );
}

export default DashboardPage;