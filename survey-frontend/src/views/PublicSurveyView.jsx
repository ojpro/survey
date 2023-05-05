import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import {BeatLoader} from "react-spinners";
import {PublicQuestionComponent} from "../components/surveys/PublicQuestionComponent.jsx";
import CustomButton from "../components/core/CustomButton.jsx";

const PublicSurveyView = () => {
  const {slug} = useParams();
  const [survey, setSurvey] = useState({questions: []})
  const [loading, setLoading] = useState(false);
  const answers = {}
  const navigate = useNavigate()

  // fetch survey on component mount
  useEffect(() => {
    setLoading(true)
    Axios.get(`/view/survey/${slug}`)
      .then(({data}) => {
        setSurvey(data.data)
        setLoading(false)
      })
  }, [])

  // handle answer update
  const handleAnswerChange = (value, question) => {
    answers[question.uuid] = value
  }

  // handle answers submit
  const handleSubmit = (event) => {
    event.preventDefault()

    // send survey answers
    Axios.post(`/survey/answer/${survey.answer_id}`, {answers})
      .then((response) => {
        navigate('/thanks', {replace: true})
      }).catch((errors) => {
      console.log(errors)
    })
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      {loading && (
        <div className='text-center m-8'>
          <BeatLoader color="#3b82f6"/>
        </div>
      )}

      {!loading && (
        <div className='p-4 w-full lg:w-1/2 mx-auto'>
          <div className='bg-gray-50 shadow rounded-md p-8 text-center flex flex-col gap-4 my-4'>
            <img src={survey.image_url} alt={survey.title} className='w-48 h-auto mx-auto'/>
            <h1>{survey.title}</h1>
            <span>Expire after: <b>{survey.expire_date}</b></span>
            <p>{survey.description}</p>
          </div>
          <div>
            <form action="#" onSubmit={handleSubmit}>
              {survey.questions.map((question, index) => (
                <PublicQuestionComponent key={question.uuid} question={question}
                                         onAnswerChange={(value) => handleAnswerChange(value, question)}/>
              ))}
              <CustomButton type='submit'>Submit</CustomButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicSurveyView;
