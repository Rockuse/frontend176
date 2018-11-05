import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Listcompany from './content/company/Listcompany'
import {Redirect} from 'react-router'
import apiconfig from '../configs/apiconfig.json'

const DashboardSwitcher =()=>{
    return(
        <main role='main' class='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
            <Switch>
                <PrivateRoute path='/dashboard' component={Listcompany}/>
            </Switch>
        </main>
    )
}
const PrivateRoute=({component:Component,...rest})=>(
    <Route
    {...rest}
    render={props=>
    localStorage.getItem(apiconfig.LS.TOKEN)!=null?(<Component {...props}/>):(
        <Redirect
        to={{
            pathname:'/',
            state:{from:props.location}
        }}
        />
    )
}
/>
)
export default DashboardSwitcher