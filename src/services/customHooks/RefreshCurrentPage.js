
const useRefreshCurrentPage = () => {
  const refreshCurrentPage = (history,string,callback) => {
      if(history.location.pathname === string){
        callback();
        console.log("refreshed " + string)
      }
  };

  return {refreshPage: refreshCurrentPage};
}

export default useRefreshCurrentPage;