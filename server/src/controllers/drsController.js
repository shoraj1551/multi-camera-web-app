const DrsService = require('../services/drsService');
const { validationResult } = require('express-validator');

// Import necessary modules

// Controller for handling DRS-related operations
class DrsController {
    // Fetch all DRS records
    static async getAllDrs(req, res) {
        try {
            const drsRecords = await DrsService.getAllDrs();
            res.status(200).json(drsRecords);
        } catch (error) {
            console.error('Error fetching DRS records:', error);
            res.status(500).json({ message: 'Failed to fetch DRS records' });
        }
    }

    // Fetch a single DRS record by ID
    static async getDrsById(req, res) {
        const { id } = req.params;
        try {
            const drsRecord = await DrsService.getDrsById(id);
            if (!drsRecord) {
                return res.status(404).json({ message: 'DRS record not found' });
            }
            res.status(200).json(drsRecord);
        } catch (error) {
            console.error('Error fetching DRS record:', error);
            res.status(500).json({ message: 'Failed to fetch DRS record' });
        }
    }

    // Create a new DRS record
    static async createDrs(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newDrs = await DrsService.createDrs(req.body);
            res.status(201).json(newDrs);
        } catch (error) {
            console.error('Error creating DRS record:', error);
            res.status(500).json({ message: 'Failed to create DRS record' });
        }
    }

    // Update an existing DRS record
    static async updateDrs(req, res) {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedDrs = await DrsService.updateDrs(id, req.body);
            if (!updatedDrs) {
                return res.status(404).json({ message: 'DRS record not found' });
            }
            res.status(200).json(updatedDrs);
        } catch (error) {
            console.error('Error updating DRS record:', error);
            res.status(500).json({ message: 'Failed to update DRS record' });
        }
    }

    // Delete a DRS record
    static async deleteDrs(req, res) {
        const { id } = req.params;
        try {
            const deletedDrs = await DrsService.deleteDrs(id);
            if (!deletedDrs) {
                return res.status(404).json({ message: 'DRS record not found' });
            }
            res.status(200).json({ message: 'DRS record deleted successfully' });
        } catch (error) {
            console.error('Error deleting DRS record:', error);
            res.status(500).json({ message: 'Failed to delete DRS record' });
        }
    }
}

module.exports = DrsController;