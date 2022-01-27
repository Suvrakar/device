import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withOidcSecure, OidcSecure } from '@axa-fr/react-oidc-context';
import LoaderPage from '../loader';


const LazyDeviceProfile = lazy(() => import('./employeeprofile.jsx'))


const EmployeesRoute1 = ({ match }) => (
   <Suspense fallback={<LoaderPage/>}>
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/employee-dashboard`} />
         <Route path={`${match.url}/leaves-employee`} >
            <OidcSecure>
               {/* <LazyLeaveEmployee /> */}
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/employee-profile/:id?`} >
            <OidcSecure>
               <LazyDeviceProfile />
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/my-profile`} >
            {/* <OidcSecure>
               <LazyDeviceProfile />
            </OidcSecure> */}
            <h1>hello</h1>
         </Route>
      </Switch>
   </Suspense>
);

export default EmployeesRoute1;
