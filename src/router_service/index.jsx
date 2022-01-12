
//Employees1
import Uiinterfaceroute from "../MainPage/Administration";
import Employees1 from "../MainPage/Employee's";
import HrRoutes from "../MainPage/HR";

export default [  

   {
      path: 'employees',
      component: Employees1
   },
   {
      path: 'hr',
      component: HrRoutes
   },
   {
      path: 'general',
      component: Uiinterfaceroute
   }
]