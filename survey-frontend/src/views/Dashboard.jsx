import DashboardPage from "../components/DashboardPage.jsx";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import {BsCalendarCheck, BsJournalCheck} from "react-icons/bs";
import {HiOutlineClock} from "react-icons/hi2";
import {SiAnswer} from "react-icons/si";
import Chart from "chart.js/auto";
import {Bar, Pie} from "react-chartjs-2";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({});

  let chart = Chart
  // charts data
  const data = {
    labels: statistics.answers_of_the_month_statistics_labels, datasets: [{
      label: "Total Answers",
      backgroundColor: ["rgb(241, 90, 90)", "rgb(250, 152, 58)", "rgb(255, 211, 89)", "rgb(84, 205, 131)", "rgb(102, 204, 255)", "rgb(0, 153, 204)", "rgb(109, 33, 79)", "rgb(145, 61, 136)", "rgb(222, 137, 147)", "rgb(204, 204, 204)"],
      borderColor: "rgb(255, 255, 255)",
      data: statistics.answers_of_the_month_statistics_data,
    },],
  };

  useEffect(() => {
    Axios.get('/dashboard')
      .then(({data}) => {
        setStatistics({...data});
      })
  }, [])
  return (<>
    <DashboardPage title='Dashboard'>
      {statistics.length === 0 && (<div className='m-4 text-center'>
        <p>No statistics found, consider creating new surveys</p>
      </div>)}

      {statistics && (

        <div className='p-4'>

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
          <div className='flex flex-row flex-wrap gap-6 my-8 justify-around'>
            <div className='flex-1 lg:w-1/2 border border-gray-50 shadow rounded-md p-4'>
              <Bar data={data} className='overflow-x-auto'/>
            </div>
            <div className='flex-1 lg:w-1/2 lg:h-[400px] border border-gray-50 shadow rounded-md p-4'>
              <Pie data={data} className='mx-auto'/>
            </div>
          </div>
          <div>
            <h3 className='text-gray-800 my-3 text-2xl font-semibold'>Trending Surveys</h3>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                <tr>
                  <th className='bg-blue-400 text-white'>
                    <label>
                      <input type="checkbox" className="checkbox"/>
                    </label>
                  </th>
                  <th className='bg-blue-400 text-white'>Survey Title / Description</th>
                  <th className='bg-blue-400 text-white'>Answers</th>
                  <th className='bg-blue-400 text-white'>Status</th>
                  <th className='bg-blue-400 text-white'></th>
                </tr>
                </thead>
                <tbody className='border border-gray-100 rounded-lg'>
                {statistics.top_surveys && statistics.top_surveys.map((survey, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox"/>
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {/* TODO: fix this */}
                            <img src={`http://localhost:8000/${survey.image}`} alt={survey.title}/>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{survey.title}</div>
                          <div className="text-sm opacity-50">{survey.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {survey.total_answers}
                    </td>
                    <td>
                      {survey.status ? (<div className="badge badge-sm bg-accent border-green-400"> visible</div>) : (
                        <div className="badge badge-sm bg-gray-400 border-gray-400"> hidden</div>)}
                    </td>
                    <th>
                      <a href={`/surveys/${survey.slug}`} className="btn btn-ghost btn-xs">details</a>
                    </th>
                  </tr>))}

                </tbody>

              </table>
            </div>
          </div>
        </div>)}
    </DashboardPage>
  </>)
}
