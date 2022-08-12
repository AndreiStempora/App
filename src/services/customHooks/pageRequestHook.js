import { useAtom } from "jotai";
import { useHistory } from "react-router";
import { error } from "../../packages/errors/index";
import { loader } from "../../packages/loaders";

const usePageRequest = ()=>{
    const history = useHistory();
    const [loading,setLoading]= useAtom(loader.showLoaderAtom);
    const [,setError] = useAtom(error.errorAtom);

    const givenFunctionWrapper = async(pageRequestFunction)=>{
        try{
            setLoading(true);
            const response = await pageRequestFunction();
            if(response?.status === "error" && response?.module ==="users-addon-2fa"){
                history.push("/2fa");
            }
            return response;
        }catch(e){
            setError(await e.toString());
        }finally{
            setLoading(false);    
        }
    }

    return {loading:loading,requestFunction:givenFunctionWrapper}
}

export default usePageRequest;