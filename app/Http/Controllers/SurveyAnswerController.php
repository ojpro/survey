<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Requests\UpdateSurveyAnswerRequest;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;

class SurveyAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /*
     * Store survey Answer
     */
    public function storeAnswer(StoreSurveyAnswerRequest $request, $surveyAnswerId)
    {
        $validated = $request->validated();

        $surveyAnswer = SurveyAnswer::findOrFail($surveyAnswerId);

        $survey = Survey::findOrFail($surveyAnswer->survey_id);

        foreach ($validated['answers'] as $questionUuid => $answer) {
            $question = SurveyQuestion::where(['uuid' => $questionUuid, 'survey_id' => $survey->id])->first();

            if (!$question) {
                return response('Invalid question\'s UUID', 400);
            }

            $data = [
                'survey_question_id' => $question->id,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer
            ];

            $questionAnswer = SurveyQuestionAnswer::create($data);
        }

        $surveyAnswer->update([
            'end_date' => date('Y-m-d H:i:s')
        ]);

        return response('', 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(SurveyAnswer $surveyAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyAnswerRequest $request, SurveyAnswer $surveyAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SurveyAnswer $surveyAnswer)
    {
        //
    }
}
