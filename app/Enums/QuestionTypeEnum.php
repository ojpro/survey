<?php

namespace App\Enums;

enum QuestionTypeEnum: string
{
    // TODO: add more types
    case TYPE_TEXT = 'text';
    case TYPE_TEXTAREA = 'textarea';
    case TYPE_SELECT = 'select';
    case TYPE_RADIO = 'radio';
    case TYPE_CHECKBOX = 'checkbox';
}
