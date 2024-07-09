<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegisterCourseMail extends Mailable
{
    use Queueable, SerializesModels;
    public $data;
    /**
     * Create a new data instance.
     *
     * @return void
     */

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Mail thông báo đăng kí khóa học thành công!')
            ->markdown('mails.register-course', ['data' => $this->data]);
    }
}