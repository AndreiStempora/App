import { atomWithStorage } from 'jotai/utils';

const TwoFA = {
    selectedOption: atomWithStorage('slected2fa',{})
}

export { TwoFA }