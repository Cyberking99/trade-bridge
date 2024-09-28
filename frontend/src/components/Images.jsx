
import AgricImage from '../assets/images/agric-com.jpg';
import SolidImage from '../assets/images/solid-comm.jpg';
// import wheatImage from '../assets/images/wheat.jpg';
// import coffeeImage from '../assets/images/coffee.jpg';
// import cocoaImage from '../assets/images/cocoa.jpg';
// import goldImage from '../assets/images/gold.jpg';
// import silverImage from '../assets/images/silver.jpg';
// import copperImage from '../assets/images/copper.jpg';
// import ironImage from '../assets/images/iron.jpg';
// import bauxiteImage from '../assets/images/bauxite.jpg';

const images = {
  agricultural: [
    { name: 'Ginger', available: '20 tonnes', price: '0.005 ETH', image: AgricImage},
    { name: 'Rice', available: '50 tonnes', price: '0.002 ETH', image: AgricImage},
    { name: 'Wheat', available: '35 tonnes', price: '0.003 ETH', image: AgricImage},
    { name: 'Coffee', available: '15 tonnes', price: '0.007 ETH', image: AgricImage },
    { name: 'Cocoa', available: '40 tonnes', price: '0.010 ETH', image: AgricImage },
  ],
  solidMinerals: [
    { name: 'Gold', available: '10 tonnes', price: '0.050 ETH', image: SolidImage},
    { name: 'Silver', available: '20 tonnes', price: '0.030 ETH', image: SolidImage},
    { name: 'Copper', available: '60 tonnes', price: '0.015 ETH', image: SolidImage },
    { name: 'Iron Ore', available: '100 tonnes', price: '0.012 ETH', image: SolidImage},
    { name: 'Bauxite', available: '80 tonnes', price: '0.020 ETH', image: SolidImage},
  ],
};

export default images;
