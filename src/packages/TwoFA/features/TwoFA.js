import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

const TwoFA = {
    selectedOption: atomWithStorage('slected2fa',{}),
    url: atomWithStorage('2faurl',''),
}

export { TwoFA }