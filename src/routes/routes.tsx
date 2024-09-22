import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../features/dashboard/dashboard.tsx'

export default [
    <Route path='/dashboard' Component={Dashboard} />
        // theres an error there and frankly i dont know why.
        // i fixed it, bad bracket, drove me mad, want to die.
]


