// Import all parking images as ES6 modules
import garageEmpty1 from './garage-empty-1.jpg';
import garageWithCar1 from './garage-with-car-1.jpg';
import garageEvCharger1 from './garage-ev-charger-1.jpg';
import coveredParking1 from './covered-parking-1.jpg';
import garageEmpty2 from './garage-empty-2.jpg';
import garageWithCar2 from './garage-with-car-2.jpg';
import garageEvCharger2 from './garage-ev-charger-2.jpg';
import coveredParking2 from './covered-parking-2.jpg';
import garageEmpty3 from './garage-empty-3.jpg';
import garageWithCar3 from './garage-with-car-3.jpg';
import garageEvCharger3 from './garage-ev-charger-3.jpg';
import coveredParking3 from './covered-parking-3.jpg';
import garageEmpty4 from './garage-empty-4.jpg';
import garageWithCar4 from './garage-with-car-4.jpg';
import garageEvCharger4 from './garage-ev-charger-4.jpg';
import coveredParking4 from './covered-parking-4.jpg';

// Export array of all parking images
export const parkingImages = [
  garageEmpty1,
  garageWithCar1,
  garageEvCharger1,
  coveredParking1,
  garageEmpty2,
  garageWithCar2,
  garageEvCharger2,
  coveredParking2,
  garageEmpty3,
  garageWithCar3,
  garageEvCharger3,
  coveredParking3,
  garageEmpty4,
  garageWithCar4,
  garageEvCharger4,
  coveredParking4,
];

// Function to get random images from the parking images array
export const getRandomParkingImages = (count: number = 5): string[] => {
  const shuffled = [...parkingImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};