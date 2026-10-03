const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');
const connectDB = require('../config/db');

dotenv.config({ path: __dirname + '/../.env' });

const initialServices = [
  {
    name: 'AC Repair & Servicing',
    description: 'Complete inspection, filter cleaning, refrigerant gas top-up, compressor diagnostic, and electrical troubleshooting for all air conditioner models.',
    price: 2500,
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Deep Home Cleaning',
    description: 'Thorough sanitization and deep cleaning for living rooms, kitchens, bathrooms, floors, and upholstery using eco-friendly and child-safe products.',
    price: 3500,
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Expert Plumbing Solutions',
    description: 'Rapid repair for pipe leaks, clogged drains, bathroom fixture installations, geyser maintenance, and full water pressure troubleshooting.',
    price: 1800,
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Certified Electrician Service',
    description: 'Safe and professional electrical wiring, circuit breaker replacements, lighting installations, ceiling fans, and home surge protection.',
    price: 1500,
    duration: '1 Hour',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Computer & Laptop Repair',
    description: 'Hardware diagnosis, screen & battery replacement, OS reinstall, malware removal, performance optimization, and SSD upgrades.',
    price: 2000,
    duration: '2.5 Hours',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Deluxe Car Wash & Detailing',
    description: 'Doorstep exterior foam wash, tire dressing, interior vacuuming, dashboard polish, and windshield water-repellent coating.',
    price: 2200,
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Creative Graphic Design',
    description: 'Custom corporate branding, logos, social media marketing banners, UI/UX mockups, brochures, and digital illustration assets.',
    price: 4500,
    duration: '3 Days',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Modern Web Development',
    description: 'Full-stack responsive web development, e-commerce storefronts, portfolio sites, and custom REST API integrations using the MERN stack.',
    price: 15000,
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
];

const seedData = async () => {
  try {
    await connectDB();
    await Service.deleteMany();
    await Service.insertMany(initialServices);
    console.log('[Seeder]: 8 Services seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { initialServices };
