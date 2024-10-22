# Google Flight Clone - Frontend
This is a frontend application that allows users to search for flights by selecting journey type, number of passengers, class type, source station, destination station, and the date of the journey. The flight results are displayed based on the input parameters.

## Features
- **Journey Type**: Users can choose between a one-way or round-trip journey.

- **Passenger Count**: Users can specify the number of passengers.
Class Type: Users can select the class of travel (e.g., Economy, Business, First Class).
- **Source and Destination**: Users can choose the departure and arrival stations.
- **Journey Date**: Users can select the date for the flight.
- **Flight Results**: Based on the user input, flight results are displayed dynamically.

## Tech Stack
- **Frontend**: React
- **Build Tool**: Vite
- **State Management**: React useState and useEffect
- **Styling**: CSS (or any preferred styling library, like Tailwind CSS)

## Setup
### Prerequisites
Make sure you have the following installed on your machine:

- **Node.js** (>= 14.x.x)
- npm or yarn

### Steps to Set up
1. **Clone the repository**
   ```bash
    git clone https://github.com/abhipythondev05/google_flight

2. **Install Dependencies**
Navigate to the project folder and install the required dependencies:

    ```bash
    cd flight_clone_fe
    npm install

    # Or if you're using yarn:
    yarn install

3. **Run the Development Server**
Once the dependencies are installed, start the development server:

   ```bash
    npm run dev
    #Or with yarn:

    yarn dev

The app should now be available at http://localhost:3000.

## Project Structure

    ├── public/
    │   ├── index.html
    │   └── ...
    ├── src/
    │   ├── assets/          # Static files (e.g., images)
    │   ├── utils/           # for redux store
    │   ├── App.jsx          # Main application component
    │   ├── main.jsx         # Entry point for React
    │   └── ...
    ├── package.json         # Project metadata and dependencies
    └── vite.config.js       # Vite configuration

## Usage
1. **Journey Type**
Choose between One-way or Round-trip.
2. **Number of Passengers**
Specify the number of passengers for the flight.
3. **Class Type**
Select the class type (Economy, Business, First Class).
4. **Source and Destination**
Enter the source and destination airport codes.
5. **Journey Date**
Pick the date of the journey.
6. **Display Flight Results**
Based on the input, flight results will be fetched and displayed dynamically (you can integrate this with a backend API or mock data for testing).
