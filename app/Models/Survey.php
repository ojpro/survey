<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title', 'image', 'slug', 'user_id', 'description', 'expire_date', 'status'
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    // survey to question relation
    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    // survey to answers relation
    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
