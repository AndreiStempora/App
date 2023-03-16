import {useHistory} from "react-router";
const useRefreshPage = () => {
      const history = useHistory();
      const refreshCurrentPage = async (string, callback) => {
            if(history.location.pathname === string){
                  await callback();
                  console.log("refreshed " + string)
            }
      };

      return {
            refreshPage: refreshCurrentPage,
            history: history
      };
}
export default useRefreshPage;