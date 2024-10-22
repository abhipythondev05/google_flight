# Google Flight Clone - Backend

This is the backend part of the Google Flight Clone project. It handles flight data fetching and provides a RESTful API for the frontend application. The backend is built using Django and Django Rest Framework (DRF), and it integrates with the Air Scraper API to retrieve flight details.

## Features

- **Flight Search API**: Fetches flight details based on source station, destination station, and date of journey.
- **Airport Information API**: Provides information about airports (e.g., code, location).
- **Integration with Air Scraper API**: Fetches real-time flight data from Air Scraper API and returns flight results.

## Tech Stack

- **Backend Framework**: Django
- **API Framework**: Django Rest Framework (DRF)
- **External API**: Air Scraper API (for fetching flight data)
- **Environment Variables**: dotenv for managing secret keys and API credentials.

## Setup

### Prerequisites

Make sure you have the following installed on your machine:

- Python (>= 3.8)
- pip (Python package manager)
- Postman or any API testing tool (for testing API endpoints)
- Air Scraper API Key (You'll need to register and get an API key from Air Scraper to fetch flight data).

### Steps to Set Up

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhipythondev05/google_flight
2. **Navigate to the project directory**
    ```bash
    cd flight_clone_be
3. **Set up a virtual environment**
 If you haven't already, create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
4. **Install dependencies** Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
5. **Set up environment** variables Create a .env file in the root directory and add the necessary environment variables:
    ```bash
    touch .env
    ```
6. **Add the following to the .env file:**
    ```bash
    RAPIDAPI_KEY=your-air-scraper-api-key
Replace your-air-scraper-api-key with your actual Air Scraper API key.


7. **Apply migrations** Run Django migrations to set up the database:
    ```bash
    python manage.py migrate
    
8. **Run the Development Server**
Start the Django development server:
    ```bash
    python manage.py runserver
