import { useState } from 'react';
import { useAtom } from 'jotai';
import { loader } from '../features/loader';

const ContentVisibility = ({children}) => {
    // const [isVisible, setIsVisible] = useState(false);
    const [show,setShow] = useAtom(loader.showContentAtom);
    setShow(false);
    // console.log(show,'show');

    return (
        <>{!show? null: children}</>
    )
}

export default ContentVisibility;