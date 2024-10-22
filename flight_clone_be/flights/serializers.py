from rest_framework import serializers
from .models import Flight

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['airline', 'flight_number', 'source_airport', 'destination_airport', 'departure_time', 'arrival_time', 'price']
