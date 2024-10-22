from django.urls import path
from .views import *

urlpatterns = [
    path("",home),
    # path('getNearByAirports/',views.getNearByAirports),
    path('airports/', airports_view, name='airports'),
    path('nearby/',getNearByAirports),
    path('airports/search/', search_airport_view, name='search_airport'),
    path('flights/search/', search_flights_view, name='search_flights'),
    path('flights/details/', flight_details_view, name='flight_details'),
    path('flights/price-calendar/', price_calendar_view, name='price_calendar'),
]
