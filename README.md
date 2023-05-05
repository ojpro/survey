
# Surveys System

Survey System using Laravel and React, with beautiful and usefull analytics.


## Screenshots

![934shots_so](https://user-images.githubusercontent.com/108437129/236502562-cf3ac0be-fb9a-4e76-b4f5-d3b457914577.png)
## Demo

https://user-images.githubusercontent.com/108437129/236502833-0a801458-27fd-4d73-8166-2c1d6c5494f6.mp4
## Features

- 🌠 Modern / Clean Design
- 📱 SPA
- 📊 Analytics / Statistics
- 🖥 Response


## Run Locally

1. Clone the project

```bash
  # using https 
  git clone https://github.com/ojpro/survey.git

  # using ssh
  git clone git@github.com:ojpro/survey.git

```

2. Go to the project directory

```bash
  cd survey
```

3. Install dependencies

```bash
  # using npm
  npm install
  
  # using yarn
  yarn
```

4. Setup Environment Variables

```bash
  # for laravel
  cp .env.example .env

  # then configure database connection
  nano .env

  # for react and vite
  echo "VITE_API_BASE_URL='http://127.0.0.1:8000'" > ./survey-frontend/.env
```

5. Start the server 

```bash
  # inside main directory (survey)
  php artisan serve
```

6. Start the React application

```bash
   cd survey-frontend
   
   # using npm
   npm run dev

   # using yarn
   yarn dev
```

🚀 Congratulations the surveys system is up and running,
visit: [http://localhost:5173](http://localhost:5173)


## Authors

- [@ojpro](https://www.github.com/ojpro)


## Contributing

Contributions are always welcome!


## License

[MIT](https://choosealicense.com/licenses/mit/)

