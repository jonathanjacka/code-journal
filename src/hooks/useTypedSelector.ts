import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { type RootState } from '../state/reducers';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;