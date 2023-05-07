import DashboardPage from "../components/DashboardPage.jsx";
import SurveyListItem from "../components/surveys/SurveyListItem.jsx";
import CustomButton from "../components/core/CustomButton.jsx";
import {FiPlusCircle} from "react-icons/fi";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import Pagination from "../components/core/Pagination.jsx";
import {BeatLoader} from "react-spinners";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const {showToast} = useStateContext()

  // get surveys
  const getSurveys = (url = '/survey') => {
    // show loading
    setLoading(true)
    Axios.get(url)
      .then(({data}) => {
        // set pagination meta information
        setMeta(data.meta)
        // store surveys
        setSurveys(data.data)
        // disable loading
        setLoading(false)
      })
  }

  // on component mount
  useEffect(() => {
    // fetch surveys
    getSurveys()
  }, [])

  const onPaginationLinkClick = (link) => {
    getSurveys(link.url)
  }

  const handleSurveyDelete = (id) => {
    if (id) {
      Axios.delete(`/survey/${id}`)
        .then(() => {
          getSurveys()
        })
        .catch(errors => {
            console.log(errors)
          }
        )
      // show success message
      showToast('Survey Deleted Successfully')
    }
  }
  return (
    <>
      <DashboardPage title='Surveys'
                     buttons={(
                       <CustomButton to="create" link><FiPlusCircle className="w-5 h-5"/> New Survey</CustomButton>)}>

        {loading && (
          <div className='text-center m-8'>
            <BeatLoader color="#3b82f6"/>
          </div>
        )}

        {!loading && (
          <div>
            {surveys.length === 0 && (
              <div className='text-gray-800 text-center my-4'>
                You don't have any surveys
              </div>
            )}
            <div className='flex flex-row flex-wrap gap-4 justify-around items-center'>
              {surveys.map((survey) => (
                <SurveyListItem survey={survey} key={survey.id} onDeleteClick={handleSurveyDelete}/>
              ))}
            </div>
            {surveys.length !== 0 && (<Pagination meta={meta} onLinkClick={onPaginationLinkClick}/>)}
          </div>
        )}

      </DashboardPage>
    </>
  )
}
