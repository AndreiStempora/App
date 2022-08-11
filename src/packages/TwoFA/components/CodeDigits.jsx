import useDigitInput from 'react-digit-input';
import { useState, useEffect } from 'react';
import { usePageRequest } from '../../../services';
import { usePageSetters } from '../../../services';

const CodeDigits = ({fields}) => {
    const [value, onChange] = useState('');
    const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();

    const digits = useDigitInput({
		acceptedCharacters: /^[0-9]$/,
		length: fields,
		value,
		onChange,
	});

    const digitForm = (fields) => {
		let inputs = [];
        for (let i = 0; i < fields; i++) {
			inputs.push(
				<input 
					className='digit' 
					inputMode="decimal" 
					key={i} 
					autoFocus={i === 0? true : false} 
					{...digits[i]} 
                />
			)
		}
		return inputs;
	}

    const sendDigitsForValidation = async ()=>{
        requestSetters.setUrl(requestSetters.url)
        requestSetters.setFormData({code:parseInt(value)});
        requestSetters.setRequestBody();
        const response = await requestSetters.fetch();

        if(response.status === "error"){
            requestSetters.setError(response?.code)
        } 

        if(response.status === "ok"){
            requestSetters.isLoggedIn(true);
            requestSetters.push('/dealerships');
        }
    }

    useEffect(()=>{
		let sendCode = false;
		let chars = value.split('');
		sendCode = chars.every(char => char !== " " || null);
		
		if(sendCode && value.length !== 0){
			(async()=>{
				pageRequest.requestFunction(sendDigitsForValidation);
			})()
		}
    },[value])

    return (
        <>
            {digitForm(fields)}
        </>
    )
}

export default CodeDigits;