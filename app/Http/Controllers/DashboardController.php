<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
        $endOfMonth = Carbon::now()->endOfMonth()->toDateString();
        $startOfLastMonth = Carbon::now()->subMonth(1)->startOfMonth()->toDateString();
        $endOfLastMonth = Carbon::now()->subMonth(1)->endOfMonth()->toDateString();


        // count the total created surveys
        $total_surveys = Survey::where('user_id', $user->id)->count();

        // get total number of answers
        $total_answers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->whereBetween('start_date', [$startOfMonth, $endOfMonth])
            ->count();

        // total answers in the last month
        $total_answers_last_month = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->whereBetween('start_date', [$startOfLastMonth, $endOfLastMonth])
            ->count();

        // percentage of
        if ($total_answers_last_month !== 0) {
            $percentageChange = (($total_answers - $total_answers_last_month) / $total_answers_last_month) * 100;
        }


        // latest answers in
        $latest_answer_date = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderByDesc('end_date')
            ->first(['end_date']);

        // total completed surveys
        $total_completed_answers = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->where('survey_answers.end_date', '>', 'survey_answers.start_date')
            ->count();

        $total_remaining_answers = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->whereNull('survey_answers.end_date')
            ->count();

        // percentage of completed answers
        if ($total_surveys > 0) {
            $completed_percentage = ($total_completed_answers / $total_answers) * 100;
        } else {
            $completed_percentage = 0;
        }

        return [
            'total_surveys' => $total_surveys,
            'total_answers' => $total_answers,
            'latest_answer_date' => \Carbon\Carbon::parse($latest_answer_date['end_date'])->diffForHumans(),
            'total_completed_surveys' => $total_completed_answers,
            'completed_percentage' => round($completed_percentage),
            'total_remaining_answers' => $total_remaining_answers,
            'answers_compared_to_last_month_percentage' => $percentageChange ?? 0
        ];
    }
}
