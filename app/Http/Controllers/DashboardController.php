<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();

        // count the total created surveys
        $total_surveys = Survey::query()->where('user_id', $user->id)->count();

        // get total number of answers
        $total_answers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        // total answers in
        $latest_answer_date = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderByDesc('end_date')
            ->first(['end_date']);

        return [
            'total_surveys' => $total_surveys,
            'total_answers' => $total_answers,
            'latest_answer_date' => \Carbon\Carbon::parse($latest_answer_date['end_date'])->diffForHumans(),
        ];
    }
}
