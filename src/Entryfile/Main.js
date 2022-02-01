import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../initialpage/App';
import config from 'config';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/font-awesome.min.css';
import '../assets/css/line-awesome.min.css';
import '../assets/js/jquery-3.2.1.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom Style File
import '../assets/css/select2.min.css';
import '../assets/css/style.css';
import '../assets/js/select2.min.js';
import '../assets/js/jquery.slimscroll.min.js';
import "../assets/js/jquery-ui.min.js"
import "../assets/js/task.js"
import "../assets/js/multiselect.min.js"
import "../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css"
// import Popper from 'popper.js
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../assets/js/app.js';
// import "../assets/js/bootstrap-datetimepicker.min.js"

import { AuthenticationProvider, oidcLog } from '@axa-fr/react-oidc-context';
import oidcConfiguration from '../auth/configuration';
import { LocalWebStorage } from '../auth/clasess/Store';
import LoaderPage from '../MainPage/loader';
import { ToastProvider } from '../Contexts/ToastContext';


const MainApp = () => (
   <AuthenticationProvider
      authenticating={LoaderPage}
      configuration={oidcConfiguration}
      callbackComponentOverride={LoaderPage}
      UserStore={LocalWebStorage}
   >
      <ToastProvider>
         <Router basename={`${config.publicPath}`}>
            <Switch>
               <Route path="/" component={App} />
            </Switch>
         </Router>
      </ToastProvider>
   </AuthenticationProvider>
);

export default MainApp;