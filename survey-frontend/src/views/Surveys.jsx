import DashboardPage from "../components/DashboardPage.jsx";
import {userStateContext} from "../contexts/ContextProvider.jsx";

export default function Surveys(){
  const {surveys} = userStateContext();
  console.log(surveys)
  return (
   <>
     <DashboardPage title='Surveys'>
      List of surveys
     </DashboardPage>
   </>
  )
}
