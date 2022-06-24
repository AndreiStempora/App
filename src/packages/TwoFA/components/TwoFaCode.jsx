// import useDigitInput from 'react-digit-input';
import { useState, useEffect } from 'react';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import parser from 'html-react-parser';

const TwoFaCode = () => {
	const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();
	const [value, onChange] = useState('');
	const [fields, setFields] = useState();
	const [pageInfo, setPageInfo] = useState();

	const requestFormFields = async ()=>{
		requestSetters.setUrl(requestSetters.data?.services[0]?.call);
        console.log(requestSetters.data)
        const response = await requestSetters.fetch();

        setFields(response?.service?.length)
        setPageInfo(response?.service?.title)
        requestSetters.setUrl(response?.service?.call);
	}

	useEffect(() => {
		pageRequest.requestFunction(requestFormFields)
	},[])

	// const digitForm = (fields) => {
	// 	let inputs = [];
    //     for (let i = 0; i < fields; i++) {
	// 		inputs.push(
	// 			<input inputMode="decimal" autoFocus={i === 0? true : false} {...digits[i]} />
	// 		)
	// 	}
	// 	return inputs;
	// }

	// const digits = useDigitInput({
	// 	acceptedCharacters: /^[0-9]$/,
	// 	length: fields,
	// 	value,
	// 	onChange,
	// });
	
	return (
		<div>
				{ pageInfo && parser(pageInfo)}
			<div className="input-group">
				{/* {digitForm(fields)} */}
				CODE
			</div>
			{/* <pre>
				<code>"{value}"</code>
			</pre> */}
		</div>
	)
}

export default TwoFaCode;