import { useAtom } from "jotai";
import { DB } from "../../packages/database";
import { error } from "../../packages/errors/index";
import { loader } from "../../packages/loaders";
import { useState } from "react";

const useDbRequest = ()=>{
    const [loading,setLoading]= useAtom(loader.showLoaderAtom);
    const [,setError] = useAtom(error.errorAtom);
    const [data,setData] = useState([]);

    const givenFunctionWrapper = async(dbRequestFunction)=>{
        setLoading(true);
        try{
            // console.log(await DB.db.openSuccess());
            // // const result = dbRequestFunction();
            const result = await dbRequestFunction();
            // setData(result);
            // setData(result);
            return result;
            // console.log(data,"data from hook");
        }catch(e){
            setError("There was a problem with the database!");
            console.error(e)
        }finally{
            
            setLoading(false); 
            
        }
    }

    return {loading:loading,requestFunction:givenFunctionWrapper,data:data}
}

export default useDbRequest;