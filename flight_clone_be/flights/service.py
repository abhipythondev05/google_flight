import requests
from django.conf import settings
import json

def get_price_calendar(originSkyId, destinationSkyId, fromDate, currency="INR"):
    """
    Function to hit the external Sky-Scrapper API to fetch the price calendar for flights.
    Arguments:
        - originSkyId: Sky ID of the origin airport.
        - destinationSkyId: Sky ID of the destination airport.
        - fromDate: Starting date for the price calendar (format: YYYY-MM-DD).
        - currency: Currency for the price (default is INR).
    Returns:
        - JSON response from the API or error message.
    """
    # Construct query parameters
    API_BASE_URL_CALENDAR = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar'
    API_HOST = 'sky-scrapper.p.rapidapi.com'
    API_KEY = settings.RAPIDAPI_KEY 
    query_params = {
        "originSkyId": originSkyId,
        "destinationSkyId": destinationSkyId,
        "fromDate": fromDate,
        "currency": currency
    }

    # Set up headers
    headers = {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
        "Content-Type": "application/json"
    }

    # Make the API request
    try:
        response = requests.get(API_BASE_URL_CALENDAR, headers=headers, params=query_params)

        # Check if the response is successful
        response.raise_for_status()
        
        # Parse the JSON response
        return response.json()
    
    except requests.exceptions.HTTPError as http_err:
        return {"status": False, "message": f"HTTP error occurred: {http_err}"}
    
    except requests.exceptions.RequestException as req_err:
        return {"status": False, "message": f"Request error occurred: {req_err}"}
    
    except json.JSONDecodeError as json_err:
        return {"status": False, "message": f"Error parsing response: {json_err}"}

def get_flight_details(legs, adults, currency, locale, market, countryCode):
    """
    This function sends a request to the SkyScrapper API to get flight details.
    """
    url = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails"
    
    # Define the query parameters
    querystring = {
        "legs": legs,
        "adults": str(adults),
        "currency": currency,
        "locale": locale,
        "market": market,
        "countryCode": countryCode
    }

    headers = {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": settings.RAPIDAPI_KEY,  # API key from environment
        "Accept": "application/json"
    }

    try:
        # Send GET request
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()  # Raise an exception if there's an HTTP error
        return response.json()  # Return the response as JSON
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def search_flights(originSkyId, destinationSkyId, originEntityId, destinationEntityId, cabinClass, adults, sortBy, currency, market, countryCode, date):
    """
    This function sends a request to the SkyScrapper API to search for flights.
    """
    url = "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights"
    
    # Define the query parameters based on the request
    querystring = {
        "originSkyId": originSkyId,
        "destinationSkyId": destinationSkyId,
        "originEntityId": originEntityId,
        "destinationEntityId": destinationEntityId,
        "cabinClass": cabinClass,
        "adults": str(adults),
        "sortBy": sortBy,
        "currency": currency,
        "market": market,
        "countryCode": countryCode,
        "date":date
    }

    # Set the headers
    headers = {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": settings.RAPIDAPI_KEY,  # API key from environment
        "Accept": "application/json"
    }

    try:
        # Send GET request
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()  # Raise an exception if there's an HTTP error
        return response.json()  # Return the response as JSON
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
def search_airport(query):
    """
    This function makes a request to the SkyScrapper API to search for an airport by query.
    """
    url = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport"
    if query=="":
        query="new"
    querystring = {
        "query": query,
        "locale": "en-US"
    }

    headers = {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": settings.RAPIDAPI_KEY,  # Ensure the key is fetched from .env
        "Accept": "application/json",
        "x-rapidapi-ua": "RapidAPI-Playground"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()  # Return the response as JSON
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def get_airports():
    url = "https://sky-scanner3.p.rapidapi.com/flights/airports"

    headers = {
        "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
        "x-rapidapi-key": settings.RAPIDAPI_KEY,  # Ensure you have the correct key loaded
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()  # Return API response as JSON
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def get_nearby_airports(lat,lng):
    url = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports"
    
    querystring = {
        "lat": str(lat), 
        "lng": str(lng), 
        "locale": "en-US"
    }

    headers = {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": settings.RAPIDAPI_KEY,  # Ensure the key is stored in settings and fetched from .env
        "Accept": "application/json",
        "x-rapidapi-ua": "RapidAPI-Playground"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()  # Return the response as JSON
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
def get_flights_from_rapidapi(source, destination):
                            #   , departure_date):
    """
    Fetch flight details from Skyscanner API via RapidAPI.
    Args:
        source (str): IATA code of the source airport (e.g., 'JFK').
        destination (str): IATA code of the destination airport (e.g., 'LAX').
        departure_date (str): Date of departure in YYYY-MM-DD format.

    Returns:
        dict: JSON response from the API or an error message.
    """
    url=f"https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId={source}&toEntityId={destination}&cabinClass=economy"
    # url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/{source}/{destination}/{departure_date}"
    headers = {
        "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()  # Return the API response as JSON
    except requests.exceptions.RequestException as e:
        # Return the error in case of any failure
        return {"error": str(e)}
