import DashboardPage from "../components/DashboardPage.jsx";
import SurveyListItem from "../components/surveys/SurveyListItem.jsx";
import CustomButton from "../components/core/CustomButton.jsx";
import {FiPlusCircle} from "react-icons/fi";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import Pagination from "../components/core/Pagination.jsx";
import {BeatLoader} from "react-spinners";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

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
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-around items-center'>
              {surveys.map((survey) => (
                <SurveyListItem survey={survey} key={survey.id}/>
              ))}
            </div>
            <Pagination meta={meta} onLinkClick={onPaginationLinkClick}/>
          </div>
        )}

      </DashboardPage>
    </>
  )
}
