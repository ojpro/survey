import DashboardPage from "../components/DashboardPage.jsx";
import {useEffect, useState} from "react";
import {FiExternalLink, FiSave, FiTrash} from "react-icons/fi";
import {HiOutlinePhoto} from "react-icons/hi2";
import CustomButton from "../components/core/CustomButton.jsx";
import Axios from "../services/axios.js";
import {useNavigate, useParams} from "react-router-dom";
import SurveyQuestions from "../components/surveys/SurveyQuestions.jsx";
import {BeatLoader} from "react-spinners";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function SurveyView() {
  const navigate = useNavigate()
  const [survey, setSurvey] = useState({
    title: "",
    slug: '',
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: []
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const {slug} = useParams()
  const {showToast} = useStateContext()


  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault()

    // AXIOS RESPONSE
    let res;

    const payload = {...survey};

    // set the image_url to be the data URI (base64 form)
    if (payload.image) {
      payload.image = payload.image_url;
    }

    // delete the image_url field after saving it
    delete payload.image_url;

    // check if you need to send update or create request
    if (slug) {
      res = Axios.put(`/survey/${survey.id}`, payload)
    } else {
      res = Axios.post('/survey', payload)
    }

    // send survey creation request
    res
      .then(({data}) => {
        // show success message
        if (slug) {
          setSurvey(data.data)
          showToast('Survey Updated Successfully');
        } else {
          // if created successfully, redirect to the surveys page
          navigate('/surveys');
          showToast('Survey Created Successfully')
        }

      })
      .catch(({response}) => {
        // set errors if exist
        setErrors(response.data.errors)
      })
  }

  // handle image upload
  const handleImageUpload = (event) => {
    // get select file
    const file = event.target.files[0];

    // create FileReader instance
    const reader = new FileReader()

    // listen for reader update
    reader.onload = (result) => {
      // then update survey image fields
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result
      })

      // clear the input value
      event.target.value = '';
    }

    // set the file to base64 format
    reader.readAsDataURL(file);
  }

  // handle survey update
  const onQuestionsUpdate = (questions) => {
    setSurvey({...survey, questions});
  }

  const deleteSurvey = () => {
    Axios.delete(`/survey/${survey.id}`)
      .then(() => {
        showToast('Survey Deleted Successfully')
        navigate('/surveys');
      })
  }

  // on mount
  useEffect(() => {
    if (slug) {
      setLoading(true)
      Axios.get(`/survey/${slug}`)
        .then(({data}) => {
          setSurvey(data.data)
          setLoading(false)
        })
        .catch((error) => {
          if (error.response) {
            // store errors
            setErrors(error.response.data.errors)
          }
        })
    }
  }, []);
  return (
    <>
      <DashboardPage title={slug ? 'Update Survey' : 'Create new Survey'} buttons={(
        <div>
          {slug && (
            <div className='flex flex-row gap-2 items-center justify-around'>
              <CustomButton link to={`/view/surveys/${survey.slug}`} target='_blank'>
                <FiExternalLink className='w-5 h-5 mr-2'/> Public Link
              </CustomButton>
              <CustomButton color='red' handleClick={() => deleteSurvey()}>
                <FiTrash className='w-5 h-5 mr-2'/> Delete Survey
              </CustomButton>
            </div>
          )}
        </div>
      )}>
        {loading && (
          <div className='text-center m-8'>
            <BeatLoader color="#3b82f6"/>
          </div>
        )}
        {!loading && (
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className='shadow-md sm:overflow-hidden sm:rounded-lg p-6'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                {/* Survey Image */}
                {/* TODO: clicking outside the button trigger the file select */}
                <label htmlFor="image_field" className='block text-sm font-medium text-gray-700'>
                  Picture
                </label>
                <div className="mt-1 flex items-center">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt={survey.title || 'Image'}
                      className='w-32 h-32 object-cover'
                    />
                  )}

                  {!survey.image_url && (
                    <span
                      className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <HiOutlinePhoto className="w-8 h-8"/>
                  </span>
                  )}

                  <button
                    type="button"
                    className="relative overflow-hidden ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <input type="file" id='image_field' className='absolute inset-0 opacity-0'
                           onChange={handleImageUpload}/>
                    Change
                  </button>
                </div>
                {/* // Survey Image */}

                {/* Survey Title */}
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor="title" className='block text-sm font-medium text-gray-700'>
                    Survey Title
                  </label>
                  <input type="text" name='title' id='title' value={survey.title} placeholder='Survey Title'
                         className='block input border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm w-full'
                         onChange={(event) => setSurvey({...survey, title: event.target.value})}/>
                  {errors.title && (
                    <span className='text-sm text-red-500 p-1'>
                      {errors.title}
                  </span>
                  )}
                </div>
                {/* // Survey Title */}

                {/* Survey Description */}
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
                    Survey Description
                  </label>
                  <textarea name='description' id='description' value={survey.description || ''}
                            placeholder='Survey Description'
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-50 focus:ring-2 focus:ring-blue-500 sm:text-sm'
                            onChange={(event) => setSurvey({...survey, description: event.target.value})}></textarea>
                </div>
                {/* // Survey Description */}

                {/* Survey Expire Date */}
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor="expire_date" className='block text-sm font-medium text-gray-700'>
                    Expire Date
                  </label>
                  <input type="date" name='expire_date' id='expire_date' value={survey.expire_date}
                         className='block input border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm w-full'
                         onChange={(event) => setSurvey({...survey, expire_date: event.target.value})}/>
                  {errors.expire_date && (
                    <span className='text-sm text-red-500 p-1'>
                      {errors.expire_date}
                  </span>
                  )}
                </div>
                {/* // Survey Expire Date */}

                {/* Survey Status */}
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input type="checkbox" id="status" name="status" checked={survey.status}
                           className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                           onChange={(event) => setSurvey({...survey, status: event.target.checked})}/>
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor="status" className="font-medium text-gray-700">
                      Active
                    </label>
                    <p className="text-gray-500">
                      Whether to make the survey publicly visible
                    </p>
                  </div>
                </div>
                {/* // Survey Status */}

                {/*// TODO: show question validation errors*/}

                {/* Survey Questions */}
                <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate}/>
                {/* // Survey Questions */}
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <CustomButton type='submit'>
                  <FiSave className="w-5 h-5"/> Save
                </CustomButton>
              </div>
            </div>
          </form>
        )}
      </DashboardPage>
    </>
  );
}
