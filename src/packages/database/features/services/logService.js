import { logRepository } from "../repositories/logRepository";

const logService = {
    
    //insert a new log
    insertLog: ([log_date, dealership_id, log_event]) => {
        logRepository.insertLog([log_date, dealership_id, log_event]);
    },

    //get all logs
    getAllLogs: () => {
        logRepository.getAllLogs();
    },

    //get a log by id
    getLogById: ([log_id]) => {
        logRepository.getLogById([log_id]);
    },

    //delete a log
    deleteLog: ([log_id]) => {
        logRepository.deleteLog([log_id]);
    },

    //get last 50 logs
    getLast50Logs: () => {
        logRepository.getLast50Logs();
    }
}

export { logService };