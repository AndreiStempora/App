import { useAtom } from "jotai";
import { error } from "../../../errors/index";
import { loader } from "../../../loaders";
import { useState } from "react";
import { DB } from "../../../database";

const useDbRequest = ()=>{
    const [loading,setLoading]= useAtom(loader.showLoaderAtom);
    const [,setError] = useAtom(error.errorAtom);
    const [data,setData] = useState([]);

    const givenFunctionWrapper = async(dbRequestFunction)=>{
        setLoading(true);
        try{
            return DB.dbInstance().then(async (db)=>{
                const result = await dbRequestFunction();
                setData(result);
                return result;

            })
        }catch(e){
            setError("There was a problem with the database!");
            console.log(e)
        }finally{
            setTimeout(()=>{
                setLoading(false);
            },200);
        }
    }

    return {loading:loading,requestFunction:givenFunctionWrapper,data:data}
}

export default useDbRequest;