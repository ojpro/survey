import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import { BiTrash} from "react-icons/bi";

export default function QuestionEditor({index = 0, question, deleteQuestion, questionChange}) {
  const [model, setModel] = useState({...question});
  const {questionTypes} = useStateContext();

  // trigger questionChange method whenever the question model changed
  useEffect(() => {
    questionChange(model)
  }, [model])

  // handy function to uppercase the first letter
  const upperCaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  return (
    <>
      <div>
        <div className='flex justify-between mb-3'>
          <h4>
            {index + 1}. {model.question}
          </h4>
          <div className='flex items-center'>
            <button type='button'
                    className='flex items-center text-xs py-2 px-3 mr-2 rounded border border-transparent text-red-500 hover:border-red-600 font-semibold'
                    onClick={() => deleteQuestion(question)}>
              <BiTrash className='w-4 mr-1'/> Delete
            </button>
          </div>
        </div>
        <div className='flex gap-3 justify-betweenmb-3'>
          {/* Question Text */}
          <div className='flex-1'>
            <label htmlFor="question" className='block text-sm font-medium text-gray-700'>
              Question
            </label>
            <input type="text" id='question' name='question' value={model.question}
                   onChange={(event) => setModel({...model, question: event.target.value})}
                   className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'/>
          </div>
          {/* // Question Text */}

          {/* Question Type */}
          <div>
            <label htmlFor="question_type" className='block text-sm font-medium text-gray-700 w-40'>
              Question type
            </label>
            <select name="question_type" id="question_type" value={model.type}
                    onChange={(event) => setModel({...model, type: event.target.value})}
                    className='mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'>
              {questionTypes.map((type) => (
                <option value={type} key={type}>{upperCaseFirst(type)}</option>
              ))}
            </select>
          </div>
          {/* // Question Type */}
        </div>
        {/* Question Description */}
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea name="description" id="description" value={model.description}
                    onChange={(event) => setModel({...model, description: event.target.value})}
                    className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'></textarea>
        </div>
        {/* // Question Description */}
      </div>
    </>
  );
}
