import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react'

/**
 * Pages
 */
import Logon from './pages/Logon/logon'
import Register from './pages/Register/register'
import Profile from './pages/Profile/profile'
import NewIncident from './pages/NewIncident/newIncident'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/incidents/new' component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;