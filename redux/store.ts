import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import { $CombinedState, AnyAction, combineReducers, configureStore as _configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { authReducer } from './auth/reducer';
import { AuthState } from './auth/types';

const combinedReducers = combineReducers({
    auth: authReducer
});

const reducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...(action.payload as typeof state)
        }
        return nextState;
    }
    return combinedReducers(state, action) as typeof state;
}

function configureStore() {
    const middlewares = [loggerMiddleware];
    const enhancers = [monitorReducerEnhancer];

    const store = _configureStore({
        reducer: reducer as any,
        middleware: defaultMiddleware => [
            ...middlewares,
            ...defaultMiddleware()
        ],
        enhancers: defaultEnhancers => [
            ...enhancers,
            ...defaultEnhancers,
        ],
        devTools: true
    })

    return store;
}

export const wrapper = createWrapper(configureStore);
const store = configureStore();

// Types based on store
export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    auth: AuthState;
}


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;