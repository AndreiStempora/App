import {useDbRequest} from "../../../packages/database";
import {useHistory} from "react-router";
import {useRSelection} from "../../../services/customHooks/utilityHooks";
import useGetDealerships from "./serverRequests";
import useUpdateDatabase from "./databaseBulkModifications";

const useHandleDealershipsPage = () => {
      const history = useHistory();
      const [editSelection] = useRSelection();
      const dbRequest = useDbRequest();
      const getDealerships = useGetDealerships();
      const updateDatabase = useUpdateDatabase();
      const handleDealershipsPage = async () => {
            dbRequest.setLoading(true);
            try {

                  const dealerships = await getDealerships();
                  if (dealerships?.serverDealerships.length > 1) {
                        return await updateDatabase(dealerships);
                  }

                  await editSelection({dealership_id: dealerships.serverDealerships[0].id});
                  history.push('/vehicle-search');

            } catch (e) {
                  console.log('error', e);
            } finally {
                  dbRequest.setLoading(false);
            }

      }
      return handleDealershipsPage;
}

export default useHandleDealershipsPage;