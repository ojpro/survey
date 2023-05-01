import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {BiTrash} from "react-icons/bi";
import {v4 as uuid} from 'uuid';
import CustomButton from "../core/CustomButton.jsx";
import {FiPlusCircle, FiTrash} from "react-icons/fi";

export default function QuestionEditor({index = 0, question, deleteQuestion, questionChange}) {
  const [model, setModel] = useState({...question});
  const {questionTypes} = useStateContext();

  // trigger questionChange method whenever the question model changed
  useEffect(() => {
    questionChange(model)
  }, [model])

  const onTypeChange = (event) => {
    // TODO: should empty option if the selected type does not need them
    // create a variable to store question
    const question = {...model, type: event.target.value}
    // add option if needed
    if (shouldHaveOptions(question.type)) {
      question.data = {
        options: [
          {
            uuid: uuid(),
            text: ''
          }
        ]
      }
    }
    // update question model
    setModel(question)
  }

  const addOption = () => {
    model.data.options.push({uuid: uuid(), text: ''})
    setModel({...model})
  }

  const onOptionChange = (event, optionId) => {
    const value = event.target.value
    model.data.options.map((option, index) => {
      if (option.uuid === optionId) {
        model.data.options[index].text = value
      }
      return option
    })
    setModel({...model})
  }

  const deleteOption = (uuid) => {
    model.data.options = model.data.options.filter((option) => option.uuid !== uuid)
    setModel({...model})
  }
  // check if the question should display options
  const shouldHaveOptions = (type = null) => {
    let questionType = type || model.type;
    return ['select', 'checkbox', 'radio'].includes(questionType)
  };

  // function to uppercase the first letter
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
                    onChange={onTypeChange}
                    className='mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'>
              {questionTypes.map((type) => (
                <option value={type} key={type}>{upperCaseFirst(type)}</option>
              ))}
            </select>
          </div>
          {/* // Question Type */}
        </div>

        {/* Question Options */}
        {shouldHaveOptions() && (
          <div className='my-4 p-2'>
            <div className='flex flex-row justify-between items-center'>
              <h4 className='text text-gray-700'>Options</h4>
              <CustomButton handleClick={addOption}>
                <FiPlusCircle className="w-5 h-5"/> New Option
              </CustomButton>
            </div>
            {(!model.data.options || model.data.options.length === 0) && (
              <div className='text-gray-800 text-center my-4'>
                Question doesn't have any option.
              </div>
            )}

            {model.data.options && model.data.options.length > 0 && (
              <div>
                {model.data.options.map((option, index) => (
                  <div key={index}>
                    <div className='flex flex-row justify-between gap-4 items-center'>
                      <label htmlFor={`option-${index}`} className='block text-sm font-medium text-gray-700'>
                        {index + 1}.
                      </label>
                      <input type="text" id={`option-${index}`} name='option' value={option.text || ' '}
                             placeholder='Option value' onChange={event => onOptionChange(event, option.uuid)}
                             className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'/>

                      <CustomButton link circle color={'red'} handleClick={() => deleteOption(option.uuid)}>
                        <FiTrash className='w-5 h-5'/>
                      </CustomButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* // Question Options */}

        {/* Question Description */}
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea name="description" id="description" value={model.description || ''}
                    onChange={(event) => setModel({...model, description: event.target.value})}
                    className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'></textarea>
        </div>
        {/* // Question Description */}
      </div>
      <hr/>
    </>
  );
}
