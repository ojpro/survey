export const PublicQuestionComponent = ({question, onAnswerChange}) => {

  let selectedOptions = []
  const onCheckboxChange = (event, option) => {
    if (event.target.checked) {
      selectedOptions.push(option)
    } else {
      selectedOptions = selectedOptions.filter((item) => item.uuid !== option.uuid)
    }

    onAnswerChange(selectedOptions)
  }


  return (
    <div className='bg-white shadow p-4 rounded-md my-3'>
      <div>
        <h3>{question.question}</h3>
        <p className='text-sm text-gray-800'>{question.description}</p>
      </div>
      <div>
        {/* TODO: improve code */}
        {question.type === 'text' && (
          <div className='my-2'>
            <input type="text" onChange={(event) => onAnswerChange(event.target.value)}
                   className='rounded border-gray-300 shadow-sm focus:ring-blue-500'/>
          </div>
        )}
        {question.type === 'select' && (
          <div className='my-2'>
            <select name="" id="" onChange={(event) => onAnswerChange(event.target.value)}
                    className='rounded border-gray-300 shadow-sm focus:ring-blue-500'>
              <option value=''>Please Select and Option</option>
              {question.data.options.map((option, index) => (
                <option key={option.uuid} value={option.uuid}>{option.text}</option>
              ))}
            </select>
          </div>
        )}
        {question.type === 'radio' && (
          <div className='my-2'>
            {question.data.options.map((option, index) => (
              <div key={option.uuid}>
                <input id={option.uuid} name={'question-' + option.id} type='radio' value={option.uuid} className='mr-2'
                       onChange={(event) => onAnswerChange(option)}/>
                <label htmlFor={option.uuid}>
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        )}
        {question.type === 'checkbox' && (
          <div className='my-2'>
            {question.data.options.map((option, index) => (
              <div key={option.uuid}>
                <input id={option.uuid} name={'question-' + option.id} type='checkbox' value={option.uuid}
                       className='mr-2'
                       onChange={(event) => onCheckboxChange(event, option)}/>
                <label htmlFor={option.uuid}>
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        )}

        {question.type === 'textarea' && (
          <div className='my-2'>
              <textarea onChange={(event) => onAnswerChange(event.target.value)}
                        className='rounded border-gray-300 shadow-sm focus:ring-blue-500 w-full md:w-1/2 lg:w-1/3'></textarea>
          </div>
        )}
      </div>
    </div>
  );
};
