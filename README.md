<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p><p align="center"><a href="http://umbrella.ge/" target="_blank"><img src="http://umbrella.ge/images/logo.png?d3855ed7cc98d2a30bb928c473756910" width="400" alt="Laravel Logo"></a></p>

## Laravel Based CRUD APPLICATION FOR Umbrella

#

### Prerequisites

-   *PHP@8.1 and up*
-   _MYSQL@8 and up_
-   _npm@10 and up_
-   _composer@2 and up_
- react + inertia

#


### Default Username and Password for admin account are
Username
```sh
test@example.com
```
Password
```sh
password
```


### Getting Started

<br>

```sh
git clone https://github.com/mr-davit/Umbrella_test_task.git
```

<br>

```sh
composer install
```

<br>

```sh
npm install
```

<br>

4\. Now we need to set our env file. Go to the root of your project and execute this command.

```sh
cp .env.example .env
```

<br>

```sh
php artisan key:generate
```

<br>

And now you should write inside of a **.env** file all necessary environment variables:

#

**MYSQL:**

<br>

> DB_CONNECTION=mysql

> DB_HOST=127.0.0.1

> DB_PORT=3306

> DB_DATABASE=

> DB_USERNAME=

> DB_PASSWORD=

<br>

6\. Now we need to install tailwind and react + inertia by following official guidelines

<a href="https://tailwindcss.com/docs/guides/laravel" target="_blank"> https://tailwindcss.com/docs/guides/laravel</a></p>


### Migration and Seeding

migrate database and seed with factory data
<br>

```sh
php artisan migrate:fresh --seed
```

<br>

#

### Development

<br>

You can run Laravel's built-in development server by executing:

```sh
  php artisan serve
```

<br>

and for tailwind:

```sh
  npm run dev
```

#
