const mongoose = require('mongoose');

require('dotenv').config();

const connectToDatabase = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToDatabase;