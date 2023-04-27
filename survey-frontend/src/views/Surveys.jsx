import DashboardPage from "../components/DashboardPage.jsx";
import {userStateContext} from "../contexts/ContextProvider.jsx";
import SurveyListItem from "../components/surveys/SurveyListItem.jsx";

export default function Surveys() {
  const {surveys} = userStateContext();

  return (
    <>
      <DashboardPage title='Surveys'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-around items-center'>
          {surveys.map((survey) => (
            <SurveyListItem survey={survey} key={survey.id}/>
          ))}
        </div>
      </DashboardPage>
    </>
  )
}
