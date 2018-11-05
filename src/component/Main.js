import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from '../component/Login'
import Dashboard from '../component/Dashboard'
import apiconfig from '../configs/apiconfig.json'

const Main=()=>{
    return (
        <main>
            <Switch>
                <Route exact path='/' render={()=>
                    localStorage.getItem(apiconfig.LS.TOKEN)==null?(
                        <Route exact path='/' component={Login}/>
                    ):(<Dashboard/>)
    }
    />
<Dashboard/>
</Switch>
</main>
    )
}
export default Main