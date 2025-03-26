const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    ipAddress: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(v);
            },
            message: props => `${props.value} is not a valid IP address!`,
        },
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'inactive',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;