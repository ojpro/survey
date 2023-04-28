import DashboardPage from "../components/DashboardPage.jsx";
import {useState} from "react";
import {FiSave} from "react-icons/fi";
import {HiOutlinePhoto} from "react-icons/hi2";
import CustomButton from "../components/core/CustomButton.jsx";

export default function CreateSurvey() {
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: []
  })

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
  }

  // handle image upload
  const handleImageUpload = () => {
    console.log('image update')
  }

  return (
    <>
      <DashboardPage title='Create new Survey'>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className='shadow-md sm:overflow-hidden sm:rounded-md'>
            <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
              {/* Survey Image */}
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
                  className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <input type="file" id='image_field' className='absolute inset-0 opacity-0' onChange={handleImageUpload}/>
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
                       className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-50 focus:ring-2 focus:ring-blue-500 sm:text-sm'
                       onChange={(event) => setSurvey({...survey, title: event.target.value})}/>
              </div>
              {/* // Survey Title */}

              {/* Survey Description */}
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
                  Survey Description
                </label>
                <textarea name='description' id='description' value={survey.description}
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
                       className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-50 focus:ring-2 focus:ring-blue-500 sm:text-sm'
                       onChange={(event) => setSurvey({...survey, expire_date: event.target.value})}/>
              </div>
              {/* // Survey Expire Date */}

              {/* Survey Status */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input type="checkbox" id="status" name="status" checked={survey.status} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" onChange={(event)=> setSurvey({...survey,status: event.target.checked}) } />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor="" className="font-medium text-gray-700">
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make the survey publicly visible
                  </p>
                </div>
              </div>
              {/* // Survey Status */}
            </div>
            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
              <CustomButton>
                <FiSave className="w-5 h-5"/> Save
              </CustomButton>
            </div>
          </div>
        </form>
      </DashboardPage>
    </>
  );
}
