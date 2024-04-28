!/bin/bash
composer install
php artisan key:generate
php artisan migrate
php artisan queue:listen --timeout=0 &

php-fpm
