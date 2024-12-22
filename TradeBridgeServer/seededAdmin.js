const mongoose = require('./Config/db');
const User = require('./Models/User');

async function seedAdmin() {
  try {
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // If the admin user doesn't exist, create a new admin user
    

    const adminUser = new User({
      companyName: 'Admin Company',
      username: 'admin',
      email: 'admin@example.com',
      password: "admin",
      phoneNumber: '111222333',
      signUpAs: 'admin',
      image: 'https://res.cloudinary.com/ddfhsv4xc/image/upload/v1704748431/flag-symbolism-Pakistan-design-Islamic_f1jviu.jpg', // Replace with the actual image URL or omit if not needed
    });

    await adminUser.save();

    console.log('Admin user seeded successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Execute the seeding function
seedAdmin();
