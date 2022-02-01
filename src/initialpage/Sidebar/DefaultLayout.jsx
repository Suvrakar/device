/**
 * App Routes
 */
import React, { lazy, Component, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import DeviceProfile from '../../MainPage/Devices/deviceProfile.jsx';
import SettingPage from '../../MainPage/Devices/settingPage.jsx';
import Users from '../../MainPage/Devices/Users.js';
import LoaderPage from '../../MainPage/loader';
import Header from './header.jsx';
import SidebarContent from './sidebar';

class DefaultLayout extends Component {
	render() {
		const { match } = this.props;


		return (
			<div className="main-wrapper">
				<Header />
				<SidebarContent />
				<Suspense fallback={<LoaderPage />}>
					<Switch>
						<Redirect exact from={`${match.url}/`} to={`${match.url}/employee-dashboard`} />
						<Route path={`${match.url}/deviceprofile`} >
							<DeviceProfile />
						</Route>
						<Route path={`${match.url}/device/:id`} >
							<SettingPage match={match} />
						</Route>
					</Switch>
				</Suspense>
			</div>
		);
	}
}
export default withRouter(DefaultLayout);


