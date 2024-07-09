@component('mail::message')
    # Xin chào, {{ $data['full_name'] }}!

    Bạn đã đăng ký thành công khóa học. Dưới đây là thông tin chi tiết:

    **Tên khóa học: {{ $data['course_name'] }}
    **Lớp: {{ $data['class'] }}
    **Thời gian: Thứ {{ $data['day_of_week'] }} ({{ $data['start_end_time'] }})
    **Phòng học: {{ $data['room'] }}
    **Giá trị: {{ $data['price'] }} VND
    **Trạng thái: {{ $data['status'] === 'success' ? 'Đã thanh toán' : 'Chưa thanh toán' }}

    @component('mail::button', ['url' => 'http://localhost:3000/courses/' . $data['course_id']])
        Xem chi tiết khóa học
    @endcomponent
@endcomponent
