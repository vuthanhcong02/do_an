@component('mail::message')
    # Xin chào, {{ $data['full_name'] }}!

    Bạn đã đăng ký thành công lịch thi. Dưới đây là thông tin chi tiết:

    **Tên: {{ $data['exam_name'] }}
    **SBD: {{ $data['candidate_number'] }}
    **Thời gian: {{ $data['start_at'] }} - {{ $data['end_at'] }}
    **Ngày thi: {{ $data['date'] }}
    **Phòng thi: {{ $data['room'] }}
    **Giá trị: {{ $data['price'] }} VND
    **Trạng thái: {{ $data['status'] === 'success' ? 'Đã thanh toán' : 'Chưa thanh toán' }}

    @component('mail::button', ['url' => 'http://localhost:3000/exams/'])
        Xem lịch thi
    @endcomponent
@endcomponent
