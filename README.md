## Set up on dev
Back End:
- cd in `backend-app`
- run `composer install`
- edit your vitural host file and add url `api.ngoaingutinhoc.tech.com`

Front End:
- cd in `frontend-app`
- run `npm install`
- edit your vitural host file and add url `ngoaingutinhoc.tlu.edu.com`

-Docker:
- run `docker compose build` on first time to build
- run `docker compose up -d`
- run `docker exec backend bash`
- run `php artisan migrate`
- Open `http://ngoaingutinhoc.tlu.edu.com` in your brower