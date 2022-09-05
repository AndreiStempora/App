import { settingsRepository } from '../repositories/settingsRepository';

const settingsService = {
    insertSetting: async ([setting_name, setting_value, dealership_id]) => {
        await settingsRepository.insertSetting([setting_name, setting_value, dealership_id]);
    },

    deleteSetting: async ([setting_name, dealership_id]) => {
        await settingsRepository.deleteSetting([setting_name, dealership_id]);
    },

    getAllSettingsByDealershipId: async ([dealership_id]) => {
        return await settingsRepository.getAllSettingsByDealershipId([dealership_id]);
    },
    deleteSettingById: async ([setting_id]) => {
        await settingsRepository.deleteSettingById([setting_id]);
    },

    deleteAllSettingsByDealershipId: async ([dealership_id]) => {
        const settings = await settingsRepository.getAllSettingsByDealershipId([dealership_id]);
        settings.map(async (setting) => {
            await settingsRepository.deleteSettingById([setting.setting_id]);
        })
    }

}

export { settingsService };