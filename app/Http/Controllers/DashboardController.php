<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // TODO : refactor all this

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
            ->orderBy('start_date')
            ->get();

        // total answers in the last month
        $total_answers_last_month = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->whereBetween('start_date', [$startOfLastMonth, $endOfLastMonth])
            ->count();

        // percentage of
        if ($total_answers_last_month !== 0) {
            $percentageChange = (($total_answers->count() - $total_answers_last_month) / $total_answers_last_month) * 100;
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

        $topSurveys = Survey::select('surveys.*', DB::raw('COUNT(survey_answers.id) as total_answers'))
            ->where('surveys.user_id', $user->id)
            ->leftJoin('survey_answers', 'surveys.id', '=', 'survey_answers.survey_id')
            ->groupBy('surveys.id')
            ->orderByDesc('total_answers')
            ->limit(10)
            ->get();


        // percentage of completed answers
        if ($total_surveys > 0) {
            $completed_percentage = ($total_completed_answers / $total_answers->count()) * 100;
        } else {
            $completed_percentage = 0;
        }

        // Initialize empty arrays for the x-axis and y-axis data
        $labels = [];
        $data = [];

        // Loop through each SurveyAnswer and extract the relevant data
        foreach ($total_answers as $answer) {
            // Get the date of the SurveyAnswer and format it as desired
            $date = date('Y-m-d', strtotime($answer->start_date));

            // If this date has not been encountered before, add it to the labels array
            if (!in_array($date, $labels)) {
                $labels[] = $date;
            }

            // Increment the count for this date in the data array
            if (isset($data[$date])) {
                $data[$date]++;
            } else {
                $data[$date] = 1;
            }
        }

        // Convert the labels and data arrays to JSON format
        $labels_json = $labels;
        $data_json = array_values($data);

        return [
            'total_surveys' => $total_surveys,
            'total_answers' => $total_answers->count(),
            'answers_labels' => $labels_json,
            'answers_data' => $data_json,
            'latest_answer_date' => \Carbon\Carbon::parse($latest_answer_date['end_date'])->diffForHumans(),
            'total_completed_answers' => $total_completed_answers,
            'completed_percentage' => round($completed_percentage),
            'total_remaining_answers' => $total_remaining_answers,
            'answers_compared_to_last_month_percentage' => $percentageChange ?? 0,
            'top_surveys' => $topSurveys
        ];
    }
}
