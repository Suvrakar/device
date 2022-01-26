/**
 * Tables Routes
 */
 import React, { lazy, Suspense } from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 import { withOidcSecure, OidcSecure } from '@axa-fr/react-oidc-context';
 import LoaderPage from '../loader';

const LazyActivities = lazy(() => import('./activities'))

// import Users from "./users"
// import Activities from "./activities"
// import Assets from "./assets"
// import knowledgebase from "./knowledgebase"
// import knowledgebaseview from "./knowledgebase-view"
// import Jobs from "./Jobs/managejobs"
// import jobApplicants from "./Jobs/appliedcandidate"
// import jobdetails from "./Jobs/jobdetails"


const Uiinterfaceroute = ({ match }) => (
   <Suspense fallback={<LoaderPage/>}>
    <Switch>
        {/* <Route path={`${match.url}/assets`} component={Assets} />
        <Route path={`${match.url}/knowledgebase`} component={knowledgebase} />
        <Route path={`${match.url}/knowledgebase-view`} component={knowledgebaseview} />
        <Route path={`${match.url}/jobs`} component={Jobs} />
        <Route path={`${match.url}/job-details`} component={jobdetails} />
        <Route path={`${match.url}/job-applicants`} component={jobApplicants} /> */}
    </Switch>
   </Suspense>

);

export default Uiinterfaceroute;
