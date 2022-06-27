import { useAtom } from "jotai";
import { request } from "../Requests/request";
import { reqBody } from "../Requests/requestBody";
import { error } from "../../packages/errors";
import { formAtoms } from "../../packages/form";
import { useHistory } from "react-router";
import { user } from "../user/user";

const usePageSetters = ()=>{
    const [url,setUrl]          = useAtom(request.URLAtom);
    const [data,fetch]          = useAtom(request.requestAtom);
    const [,setRequestBody]     = useAtom(reqBody.requestBodyAtom);
    const [,setError]           = useAtom(error.errorAtom);
    const [,setFormData]        = useAtom(formAtoms.formDataAtom);
    const history               = useHistory();
    const [,isLoggedIn]         = useAtom(user.getLoggedIn);
    const [, setToken]          = useAtom(user.tokenAtom);

    const push = (str)=>{
        history.push(str)
    }

    return{
        url:url,
        setUrl:setUrl,
        data:data,
        fetch:fetch,
        setRequestBody:setRequestBody,
        setError:setError,
        setFormData:setFormData,
        push:push,
        isLoggedIn:isLoggedIn,
        setToken:setToken
    }
}

export default usePageSetters;