<?php

namespace App\Enums;

enum QuestionTypeEnum: string
{
    case TYPE_TEXT = 'text';
    case TYPE_TEXTAREA = 'textarea';
    case TYPE_SELECT = 'select';
    case TYPE_RADIO = 'radio';
    case TYPE_CHECKBOX = 'checkbox';
}
