# Run Locally

1. Clone the project to your local machine

2. `cd` in to repo and run:

    ```bash 
       composer install
       npm install

3. To run the project, in one terminal run the following to build the site:

        ```bash
        composer run dev
        ```

    And in another terminal run the following to serve the site

    ```bash
    php artisan serve
    ```
   

# Files where you can find the work:

  * /resources/js/pages/Welcome.vue 
    - This is the main page of the app
  * /resources/js/shared/services
    - This is a service I built to make axios calls easier (calling data from backend still in progress)
  * /app/Http/Controllers/DataController.php
    - This is the controller that manages API calls (WIP)
  * /routes/api.php
    - Where the route to call the controller is defined
