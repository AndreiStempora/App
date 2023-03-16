import useGetDealerships from "../../../dealerships/features/serverRequests";
import useUpdateDatabase from "../../../dealerships/features/databaseBulkModifications";
const useUpdateDatabaseSingleDealership = () => {
      const getDealerships = useGetDealerships();
      const updateDatabase = useUpdateDatabase();

      const checkDealershipsNumber = async () => {
            const {serverDealerships,serverVehicles} = await getDealerships();

            if (serverDealerships?.length === 1) {
                  return await updateDatabase({serverDealerships, serverVehicles});
            }
      };

      return checkDealershipsNumber;
}

export default useUpdateDatabaseSingleDealership;