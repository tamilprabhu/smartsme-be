const { State, District, Pincode } = require("../models");
const logger = require("../config/logger");

const referenceService = {
    getAllStates: async () => {
        logger.info("ReferenceService: Fetching all states");
        try {
            const states = await State.findAll({
                where: { isDeleted: false, isActive: true },
                attributes: ['id', 'stateName', 'stateCode'],
                order: [['stateName', 'ASC']]
            });
            logger.info(`ReferenceService: Successfully retrieved ${states.length} states`);
            return states;
        } catch (error) {
            logger.error("ReferenceService: Failed to fetch states", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getDistrictsByState: async (stateId) => {
        logger.info(`ReferenceService: Fetching districts for state ID: ${stateId}`);
        try {
            const districts = await District.findAll({
                where: { stateId, isDeleted: false, isActive: true },
                attributes: ['id', 'districtName'],
                order: [['districtName', 'ASC']]
            });
            logger.info(`ReferenceService: Successfully retrieved ${districts.length} districts`);
            return districts;
        } catch (error) {
            logger.error(`ReferenceService: Failed to fetch districts for state ID: ${stateId}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    searchPincodes: async (pincode) => {
        logger.info(`ReferenceService: Searching pincodes with: ${pincode}`);
        try {
            const pincodes = await Pincode.findAll({
                where: { pincode, isDeleted: false, isActive: true },
                attributes: ['id', 'postOfficeName', 'pincode', 'stateName'],
                order: [['postOfficeName', 'ASC']]
            });
            logger.info(`ReferenceService: Successfully retrieved ${pincodes.length} pincodes`);
            return pincodes;
        } catch (error) {
            logger.error(`ReferenceService: Failed to search pincodes: ${pincode}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = referenceService;
