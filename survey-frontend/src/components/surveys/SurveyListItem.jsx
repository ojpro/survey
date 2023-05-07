import CustomButton from "../core/CustomButton.jsx";
import {CiEdit} from "react-icons/ci";
import {FiExternalLink, FiTrash} from "react-icons/fi";

export default function SurveyListItem({
                                         survey, onDeleteClick = (param) => {
  }
                                       }) {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-md hover:shadow-lg">
        <figure className="px-12 pt-12">
          <img src={survey.image_url} alt={survey.title} className="rounded-xl"/>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{survey.title}</h2>
          <p>{survey.description}</p>
        </div>
        <div className='flex flex-row justify-between gap-2 items-center card-actions p-4'>
          <CustomButton link to={`/surveys/${survey.slug}`}>
            <CiEdit className='w-5 h-5'/> Edit
          </CustomButton>
          <div className='flex flex-row flex-nowrap justify-around items-center gap-2'>
            <CustomButton link circle color={'gray'} to={`/view/surveys/${survey.slug}`} target='_blank'>
              <FiExternalLink className='w-5 h-5'/>
            </CustomButton>
            <CustomButton link circle color={'red'} handleClick={() => onDeleteClick(survey.id)}>
              <FiTrash className='w-5 h-5'/>
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
