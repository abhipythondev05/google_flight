from django.db import models

class Airport(models.Model):
    code = models.CharField(max_length=3, unique=True)  # Airport code (e.g., LAX, JFK)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Airline(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3, unique=True)  # Airline code (e.g., AA, BA)

    def __str__(self):
        return self.name

class Flight(models.Model):
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE)
    flight_number = models.CharField(max_length=10)
    source_airport = models.ForeignKey(Airport, related_name='departures', on_delete=models.CASCADE)
    destination_airport = models.ForeignKey(Airport, related_name='arrivals', on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.airline.name} {self.flight_number}: {self.source_airport.code} -> {self.destination_airport.code}"

