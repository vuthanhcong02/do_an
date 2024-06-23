<?php

namespace App\Http\Controllers;

use App\Services\ContactService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    //
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function getAll()
    {
        $contacts = $this->contactService->getAll();

        if (!$contacts) {
            return $this->customResponse(404, false, null, 'Contact not found', null);
        }

        return $this->customResponse(200, true, $contacts, null, null);
    }

    public function createContact(Request $request)
    {
        $data = $request->all();
        $contact = $this->contactService->create($data);
        if (!$contact) {
            return $this->customResponse(500, false, null, 'Contact not created', null);
        }
        return $this->customResponse(200, true, $contact, null, null);
    }
}