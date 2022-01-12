/**
 * App Routes
 */
import React, { useEffect,useState } from 'react';
import { Route, withRouter } from 'react-router-dom';

// router service
import settingservice from "../../router_service/settingservice";

import Header from './header';
import SidebarContent from './settingsidebar';
import { useReactOidc } from '@axa-fr/react-oidc-context';



const SettingsLayout =(props)=> {
	const { oidcUser } = useReactOidc();

	const chcekPermission =  (permission_arr, feature) => {
		return (permission_arr.find((x)=>x.includes(`hrms:admin:${feature}`)))
	  }

	const [setupPermission, setsetupPermission] = useState(true)

	useEffect(() => {
		setsetupPermission(chcekPermission(oidcUser.profile.permissions,'setup'))
	}, [])

		const { match } = props;
		return (
			<div className="main-wrapper">
				<Header/>
				{setupPermission?
				<div>
					{settingservice && settingservice.map((route,key)=>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}
				</div>:<div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}><h1>Chutiya detected</h1></div>}				
				{setupPermission?<SidebarContent/>:""}
			</div>
		);
	
}
export default withRouter(SettingsLayout);