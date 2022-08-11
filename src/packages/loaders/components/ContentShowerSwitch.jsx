import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loader } from '../features/loader';

const ContentVisibility = ({children}) => {
    // const [isVisible, setIsVisible] = useState(false);
    const [show,setShow] = useAtom(loader.showContentAtom);
    // setShow(false);
    // console.log(show,'show');
    useEffect(()=>{
        setShow(true);
    },[loader.showContentAtom])

    return (
        <>{show?children : <></>}</>
    )
}

export default ContentVisibility;