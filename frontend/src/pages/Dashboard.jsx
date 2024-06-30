import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] =useState('')
useEffect(() => {
  
const urlParams = new URLSearchParams(location.search)
const tabFromUrl = urlParams.get('tab')
 if(tabFromUrl){
  setTab(tabFromUrl)
 }
}, [location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashboardSidebar/>
      </div>
      <div>
{/* Right side page */}

{
tab === 'profile' && <DashboardProfile/>
}
      </div>
    </div>
  )
}

export default Dashboard