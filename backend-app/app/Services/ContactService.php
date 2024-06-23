<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Str;

class ContactService extends BaseService
{
    public function __construct(Contact $contact)
    {
        parent::__construct($contact);
    }
}