@component('mail::message')
    # Xin chào, {{$user->full_name }}!

    Click vào liên kết dưới đây để xác nhận tài khoản của bạn

    @component('mail::button', ['url' => $verificationUrl])
        Xác nhận tài khoản
    @endcomponent
@endcomponent
