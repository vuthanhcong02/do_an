FROM php:8.2-fpm-alpine

# Set working directory
ARG workdir=/var/www

WORKDIR $workdir

# Install system dependencies
RUN apk update
RUN apk add --no-cache \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    freetype-dev \
    libzip-dev \
    zip \
    bash \
    dos2unix

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql \
    && docker-php-ext-install mysqli && docker-php-ext-enable mysqli \
    && docker-php-ext-install exif \
    && docker-php-ext-install zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# # Install redis extension
# RUN pecl install redis \
#     && rm -rf /tmp/pear \
#     && docker-php-ext-enable redis

# RUN install-php-extensions redis gd

COPY . .

# Get latest Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Copy the docker-app-start.sh script from the local directory into the container
COPY docker-start.sh .

# Set executable permission for docker-app-start.sh
RUN chmod +x ./docker-start.sh && sh ./docker-start.sh

# CMD ["/var/www/docker-start.sh"]
