from rest_framework import generics
from rest_framework.response import Response
from .service import *
from django.http import HttpResponse
from rest_framework.decorators import api_view

def home(request):
    return HttpResponse("<h1>Flight</h1>")
def testing(request):
    return HttpResponse("<h1>Testing</h1>")
@api_view(['GET'])
def price_calendar_view(request):
    """
    Django view that calls the external API to get the price calendar for flights.
    """
    originSkyId = request.query_params.get('originSkyId')
    destinationSkyId = request.query_params.get('destinationSkyId')
    fromDate = request.query_params.get('fromDate')
    currency = request.query_params.get('currency', 'INR')  # Default to INR if not provided

    # Validate required parameters
    if not all([originSkyId, destinationSkyId, fromDate]):
        return Response({"error": "Missing required parameters: originSkyId, destinationSkyId, fromDate"}, status=400)

    # Call the service function to get price calendar
    price_calendar = get_price_calendar(originSkyId, destinationSkyId, fromDate, currency)
    
    return Response(price_calendar)

@api_view(['GET'])
def flight_details_view(request):
    """
    Django view that calls the external API to get flight details.
    """
    # Get query parameters from the request
    legs = request.query_params.get('legs')
    adults = request.query_params.get('adults', 1)
    currency = request.query_params.get('currency', 'USD')
    locale = request.query_params.get('locale', 'en-US')
    market = request.query_params.get('market', 'en-US')
    countryCode = request.query_params.get('countryCode', 'US')

    # Check for the required parameter `legs`
    if not legs:
        return Response({"error": "Missing required parameter: legs"}, status=400)

    # Call the service function to get flight details
    flight_details = get_flight_details(legs, adults, currency, locale, market, countryCode)
    
    # Return the API response as JSON
    return Response(flight_details)
@api_view(['GET'])
def search_airport_view(request):
    """
    Django view that calls the external service to search for airports based on a query string.
    """
    # Get the query parameter from the request
    query = request.query_params.get('query')

    if not query:
        return Response({"error": "Query parameter is required."}, status=400)

    # Call the service function to search for airports
    airport_data = search_airport(query)
    return Response(airport_data)


@api_view(['GET'])
def getNearByAirports(request):
    """
    Django view that calls the external service to fetch nearby airports based on lat and lng.
    """
    lat = request.query_params.get('lat')
    lng = request.query_params.get('lng')

    if not lat or not lng:
        return Response({"error": "Latitude and Longitude are required."}, status=400)

    # Call the service function to fetch nearby airports
    airports_data = get_nearby_airports(lat, lng)
    return Response(airports_data)


@api_view(['GET'])
def airports_view(request):
    airports_data = get_airports()
    return Response(airports_data)


@api_view(['GET'])
def search_flights_view(request):
    """
    Django view that calls the external API to search for flights.
    """
    # Get query parameters from the request
    originSkyId = request.query_params.get('originSkyId')
    destinationSkyId = request.query_params.get('destinationSkyId')
    originEntityId = request.query_params.get('originEntityId')
    destinationEntityId = request.query_params.get('destinationEntityId')
    cabinClass = request.query_params.get('cabinClass', 'economy')
    adults = request.query_params.get('adults', 1)
    sortBy = request.query_params.get('sortBy', 'best')
    currency = request.query_params.get('currency', 'USD')
    market = request.query_params.get('market', 'en-US')
    countryCode = request.query_params.get('countryCode', 'US')
    date = request.query_params.get('date')

    # Check for required parameters
    if not (originSkyId and destinationSkyId and originEntityId and destinationEntityId and date):
        return Response({"error": "Missing required parameters: originSkyId, destinationSkyId, originEntityId, destinationEntityId"}, status=400)
    # Call the service function to search for flights
    flight_data = search_flights(originSkyId, destinationSkyId, originEntityId, destinationEntityId, cabinClass, adults, sortBy, currency, market, countryCode, date)
    # Return the API response as JSON
    return Response(flight_data)