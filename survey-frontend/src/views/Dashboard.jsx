import DashboardPage from "../components/DashboardPage.jsx";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import {BsCalendarCheck, BsJournalCheck} from "react-icons/bs";
import {HiOutlineClock} from "react-icons/hi2";
import {SiAnswer} from "react-icons/all.js";

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
          <div className="stats shadow flex flex-row flex-wrap">

            <div className="stat flex-1">
              <div className="stat-figure text-primary">
                <BsJournalCheck className='w-6 h-6'/>
              </div>
              <div className="stat-title">Total Surveys</div>
              <div className="stat-value text-primary p-1">{statistics.total_surveys}</div>
            </div>

            <div className="stat flex-1">
              <div className="stat-figure text-secondary">
                <SiAnswer className='w-6 h-6'/>
              </div>
              <div className="stat-title">Total Answers</div>
              <div className="stat-value text-secondary">{statistics.total_answers}</div>
              <div className="stat-desc">{statistics.answers_compared_to_last_month_percentage}% more than last month
              </div>
            </div>

            <div className="stat flex-1">
              <div className="stat-figure text-accent">
                <HiOutlineClock className='w-7 h-7'/>
              </div>
              <div className="stat-title">Latest Answer in</div>
              <div className="stat-value text-accent text-3xl">{statistics.latest_answer_date}</div>
            </div>

            <div className="stat flex-1">
              <div className="stat-figure text-orange-500">
                <BsCalendarCheck className='w-6 h-6'/>
              </div>
              <div className="stat-value">{statistics.completed_percentage}%</div>
              <div className="stat-title">Answers completed</div>
              <div className="stat-desc text-orange-500">{statistics.total_remaining_answers} answers remaining</div>
            </div>

          </div>
        )}
      </DashboardPage>
    </>
  )
}
