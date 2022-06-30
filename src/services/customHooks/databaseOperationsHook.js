import { useAtom } from "jotai";
import { error } from "../../packages/errors/index";
import { loader } from "../../packages/loaders";

const useDbRequest = ()=>{
    const [loading,setLoading]= useAtom(loader.showLoaderAtom);
    const [,setError] = useAtom(error.errorAtom);

    const givenFunctionWrapper = async(dbRequestFunction)=>{
        try{
            setLoading(true);
            await dbRequestFunction();
        }catch(e){
            setError("There was a problem with the database!");
        }finally{
            setTimeout(()=>{
                setLoading(false); 
            },0)
        }
    }

    return {loading:loading,requestFunction:givenFunctionWrapper}
}

export default useDbRequest;