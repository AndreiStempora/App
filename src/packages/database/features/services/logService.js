import { logRepository } from "../repositories/logRepository";

const logService = {

    //insert a new log
    insertLog: async ([log_date, dealership_id, log_event]) => {
        await logRepository.insertLog([log_date, dealership_id, log_event]);
    },

    //get all logs
    getAllLogs: async () => {
        return await logRepository.getAllLogs();
    },

    //get a log by id
    getLogById: async ([log_id]) => {
        return await logRepository.getLogById([log_id]);
    },

    //delete a log
    deleteLog: async ([log_id]) => {
        await logRepository.deleteLog([log_id]);
    },

    //get last 50 logs
    getLast50Logs: async () => {
        return await logRepository.getLast50Logs();
    },

    getLast300Logs: async () => {
        return await logRepository.getLast300Logs();
    },

    deleteAllLogsExceptLast300: async () => {
        return await logRepository.deleteAllLogsExceptLast300();
    },
}

export { logService };