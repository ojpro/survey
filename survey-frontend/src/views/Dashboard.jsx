import DashboardPage from "../components/DashboardPage.jsx";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    Axios.get('/dashboard')
      .then(({data}) => {
        setStatistics(data);
      })
  }, [])
  return (
    <>
      <DashboardPage title='Dashboard'>
        {statistics.length === 0 && (
          <div className='m-4 text-center'>
            <p>No statistics found, consider creating new surveys</p>
          </div>
        )}

        {statistics && (
          <div className='m-4 flex flex-row flex-wrap gap-5 justify-start items-center'>
            <div className='shadow-md p-4 rounded-md w-64'>
              <span className='text-gray-600 text-right text-lg'>Total Surveys</span>
              <br/>
              <span className='mt-2 block text-gray-800 text-lg font-semibold'>{statistics.total_surveys}</span>
            </div>
            <div className='shadow-md p-4 rounded-md w-64'>
              <span className='text-gray-600 text-right text-lg'>Total Answers</span>
              <br/>
              <span className='mt-2 block text-gray-800 text-lg font-semibold'>{statistics.total_answers}</span>
            </div>
            <div className='shadow-md p-4 rounded-md w-64'>
              <span className='text-gray-600 text-right text-lg'>Total Surveys</span>
              <br/>
              <span className='mt-2 block text-gray-800 text-lg font-semibold'>{statistics.latest_answer_date}</span>
            </div>
          </div>
        )}
      </DashboardPage>
    </>
  )
}
