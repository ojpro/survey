<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'slug' => $this->slug,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'status' => !!$this->status,
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d'),
            'created_at' => $this->created_at,
            'answer_id' => $this->answer_id ?? null,
            'questions' => SurveyQuestionResource::collection($this->questions)
        ];
    }
}
