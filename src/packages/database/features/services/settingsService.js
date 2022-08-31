import { settingsRepository } from '../repositories/settingsRepository';

const settingsService = {
    insertSetting: async ([setting_name, setting_value, dealership_id]) => {
        await settingsRepository.insertSetting([setting_name, setting_value, dealership_id]);
    },

    deleteSetting: async ([setting_name, dealership_id]) => {
        await settingsRepository.deleteSetting([setting_name, dealership_id]);
    }
}

export { settingsService };