import React from 'react'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'
import DashboardSwitcher from '../component/DashboardSwitcher'

class Dashboard extends React.Component
{
    render()
    {
        return(
            <div> 
                <Header/>
                <div className='container-fluid'>
                <div className='row'>
                <Sidebar/>
                <DashboardSwitcher/>
                </div>
            </div>
            </div>
        )
    }
}
export default Dashboard