import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';
import QuestionEditor from "./QuestionEditor.jsx";

export default function SurveyQuestions({questions, onQuestionsUpdate}) {
  const [model, setModel] = useState([...questions]);
  // handle adding new question action
  const addQuestion = () => {
    // update questions model
    setModel([...model, {
      id: uuid(), type: 'text', question: "", description: "", data: {}
    }])
  }

  // handle question change event
  const questionChange = (question) => {
    // return void if question does not exist
    if (!question) return;

    // loop through the questions model
    const newQuestions = model.map(old_question => {
      // if the question exists in questions' model
      if (question.id === old_question.id) {
        // update that question
        return {...question}
      } else {
        // otherwise keep it
        return old_question
      }
    })

    // update the model's questions by the newQuestions array
    setModel(newQuestions);
  }

  const deleteQuestion = (question) => {
    // remove the question from the questions' model if exist
    const newQuestion = model.filter((q) => q.id !== question.id);

    // update the questions' model
    setModel(newQuestion)
  }

  // call onQuestionsUpdate method when model changes
  useEffect(() => {
    onQuestionsUpdate(model);
  }, [model])
  return (<>
    <div className='flex justify-between'>
      <h3 className='text-2xl font-bold'>Questions</h3>
      <button type='button'
              className='flex items-center text-sm py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-700'
              onClick={() => addQuestion()}>
        <BiPlus className='w-4 mr-2'/> Add Question
      </button>
    </div>

    {model.length ? (model.map((question, index) => (
      <QuestionEditor key={question.id} index={index} question={question} questionChange={questionChange}
                      deleteQuestion={deleteQuestion}/>
    ))) : (<div className='text-gray-400 text-center py-4'>
      You don't have any created questions
    </div>)}
  </>);
}
