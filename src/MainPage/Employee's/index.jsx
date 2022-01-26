import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withOidcSecure, OidcSecure } from '@axa-fr/react-oidc-context';
import LoaderPage from '../loader';


const LazyAttendanceEmployee = lazy(() => import('./attendanceemployee'))
const LazyEmployeeDashboard = lazy(() => import('./employeedashboard'))
const LazyEmployeeProfile = lazy(() => import('./employeeprofile'))
const LazyApproval = lazy(() => import('./leave_req'))


const EmployeesRoute1 = ({ match }) => (
   <Suspense fallback={<LoaderPage/>}>
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/employee-dashboard`} />

         <Route path={`${match.url}/employee-dashboard`} >
            <OidcSecure>
               <LazyEmployeeDashboard />
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/leaves-employee`} >
            <OidcSecure>
               {/* <LazyLeaveEmployee /> */}
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/attendance-employee/:id?`} >
            <OidcSecure>
               <LazyAttendanceEmployee />
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/employee-profile/:id?`} >
            <OidcSecure>
               <LazyEmployeeProfile />
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/my-profile`} >
            <OidcSecure>
               <LazyEmployeeProfile />
            </OidcSecure>
         </Route>
         <Route path={`${match.url}/leaves-approval`} >
            <OidcSecure>
               <LazyApproval />
            </OidcSecure>
         </Route>
         {/* <Route path={`${match.url}/leaves-employee`} component={withOidcSecure(LazyLeaveEmployee)} />
         <Route path={`${match.url}/attendance-employee`} component={withOidcSecure(LazyAttendanceEmployee)} />
         <Route path={`${match.url}/employee-dashboard`} component={withOidcSecure(LazyEmployeeDashboard)} />
         <Route path={`${match.url}/employee-profile/:id?`} component={withOidcSecure(LazyEmployeeProfile)} />
         <Route path={`${match.url}/my-profile`} component={withOidcSecure(LazyEmployeeProfile)} /> */}
      </Switch>
   </Suspense>
);

export default EmployeesRoute1;
