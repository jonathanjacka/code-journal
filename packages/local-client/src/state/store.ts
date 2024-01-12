import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middleware/persist-middleware';

export const store = createStore(
    reducers,
    {},
    //@ts-expect-error - action type is not a string
    applyMiddleware(thunk, persistMiddleware)
);





