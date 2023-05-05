<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // fetch user's surveys
        $surveys = Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10);

        // return collection of surveys
        return SurveyResource::collection($surveys);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        // if there is an image in the request save in the storage
        if (isset($data['image'])) {
            $image_path = $this->saveImage($data['image']);
            $data['image'] = $image_path;
        }

        // save the survey
        $survey = Survey::create($data);

        // save question
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        // return the survey resource
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request) // TODO: use slug instead of id
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            return abort(Response::HTTP_FORBIDDEN, 'Unauthorized to perform this action');
        }

        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $image_path = $this->saveImage($data['image']);
            $data['image'] = $image_path;

            // if there is already an image, delete it
            if ($survey->image) {
                $image_path = public_path($survey->image);
                File::delete($image_path);
            }
        }

        // update survey data
        $survey->update($data);

        // get survey's questions ids as an array
        $old_ids = Arr::pluck($survey->questions()->get(), 'id');

        // get ids of new questions
        $new_ids = Arr::pluck($data['questions'], 'id');

        // find questions to delete
        $to_delete = array_diff($old_ids, $new_ids);

        //find questions to add
        $to_add = array_diff($new_ids, $old_ids);

        // delete question from $to_delete array
        SurveyQuestion::destroy($to_delete);

        // create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $to_add)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // create questions map array by id
        $questionMap = collect($data['questions'])->keyBy('id');

        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            return abort(Response::HTTP_FORBIDDEN, 'Unauthorized to perform this action');
        }

        $survey->delete();

        // delete the survey's image if it exists
        if ($survey->image) {
            $image_path = public_path($survey->image);
            File::delete($image_path);
        }

        return response('', Response::HTTP_NO_CONTENT);
    }

    /*
     * Save the image into the storage
     */

    protected function saveImage($image): string
    {
        // check if the image is a valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // get the base64 string without the mime type
            $image = substr($image, strpos($image, ',') + 1);
            // get the image extension
            $extension = strtolower($type[1]);

            // check if it's an image extension
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'git'])) {
                throw new \Exception('invalid image extension');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('The image is not valid');
        }

        // set images directory
        $images_dir = 'surveys/images/';
        // generate random image name with extension
        $filename = Str::random() . '.' . $extension;
        // get the public path for the images directory
        $absolute_path = public_path($images_dir);
        // relative path
        $relative_path = $images_dir . $filename;

        // check if the directory does not exist
        if (!File::exists($absolute_path)) {
            // then create it
            File::makeDirectory($absolute_path, 0755, true);
        }
        // save image URI content into the image
        file_put_contents($relative_path, $image);

        // return relative path
        return $relative_path;
    }

    /*
     * Create survey questions
     */

    protected function createQuestion($question)
    {
        // convert question into
        if (is_array($question['data'])) {
            $question['uuid'] = $question['id'];
            $question['data'] = json_encode($question['data']);
        }
        // TODO: create validation request class
        $validator = Validator::make($question, [
            'uuid' => ['required', 'string', 'unique:survey_questions,uuid'],
            'question' => ['required', 'string'],
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => ['nullable', 'string'],
            'data' => ['present'],
            'survey_id' => ['exists:surveys,id']
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    /*
     * Update Survey's questions
     */

    protected function updateQuestion(SurveyQuestion $surveyQuestion, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => ['exists:survey_questions,id'],
            'question' => ['required', 'string'],
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => ['nullable', 'string'],
            'data' => ['present']
        ]);

        return $surveyQuestion->update($validator->validated());
    }

    /*
     *  Fetch survey information for public viewing
     */
    public function getSurvey(Survey $survey)
    {
        $current_time = new \DateTime();
        $expire_date = new \DateTime($survey->expire_date);

        if (!$survey->status || ($current_time > $expire_date)) {
            return response('', 404);
        }

        // start a new survey answer
        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => null
        ]);

        $survey['answer_id'] = $surveyAnswer->id;

        return new SurveyResource($survey);
    }

}
