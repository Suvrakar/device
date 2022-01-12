import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withOidcSecure, OidcSecure } from '@axa-fr/react-oidc-context';
import LoaderPage from '../loader';

const LazyAttendanceHr = lazy(() => import('./Attendance_Hr'))


const AdminRoutes = ({ match }) => (
   <Suspense fallback={<LoaderPage/>}>
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/employee-dashboard`} />
         <Route path={`${match.url}/attendance`} >
            <OidcSecure>
               {/* <PP/> */}
               <LazyAttendanceHr />
            </OidcSecure>
         </Route>
      
      </Switch>
    </Suspense>
);

export default AdminRoutes;
