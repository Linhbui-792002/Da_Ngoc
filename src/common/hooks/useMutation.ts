import { useReducer } from 'react';
import * as request from '../lib/httpRequest';

interface State {
    isLoading: boolean;
    data: any; // Change 'any' to the type of your data
    error: string | null;
}

interface Action {
    type: string;
    payload?: any; // Change 'any' to the type of your payload
}

const INITIAL_STATE: State = {
    isLoading: false,
    data: null,
    error: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'API_LOADING':
            return { ...state, isLoading: true };
        case 'API_SUCCESS':
            return { ...state, isLoading: false, data: action.payload };
        case 'API_FAILED':
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const useMutation = (): [(method: string, endpointURL: string, body?: any) => Promise<void>, State] => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const postApi = async (endpointURL: string, body: any) => {
        dispatch({ type: 'API_LOADING' });
        try {
            const response = await request.post(endpointURL, body,undefined);
            dispatch({ type: 'API_SUCCESS', payload: response?.data?.data });
        } catch (error) {
            dispatch({ type: 'API_FAILED', payload: 'Something went wrong. Please try again!' });
        }
    };

    const putApi = async (endpointURL: string, body: any) => {
        dispatch({ type: 'API_LOADING' });
        try {
            const response = await request.put(endpointURL, body,undefined);
            dispatch({ type: 'API_SUCCESS', payload: response?.data?.data });
        } catch (error) {
            dispatch({ type: 'API_FAILED', payload: 'Something went wrong. Please try again!' });
        }
    };

    const patchApi = async (endpointURL: string, body: any) => {
        dispatch({ type: 'API_LOADING' });
        try {
            const response = await request.patch(endpointURL, body,undefined);
            dispatch({ type: 'API_SUCCESS', payload: response?.data?.data });
        } catch (error) {
            dispatch({ type: 'API_FAILED', payload: 'Something went wrong. Please try again!' });
        }
    };

    const deleteApi = async (endpointURL: string) => {
        dispatch({ type: 'API_LOADING' });
        try {
            const response = await request.remove(endpointURL);
            dispatch({ type: 'API_SUCCESS', payload: response?.data });
        } catch (error) {
            dispatch({ type: 'API_FAILED', payload: 'Something went wrong. Please try again!' });
        }
    };

    const trigger = async (method: string, endpointURL: string, body?: any): Promise<void> => {
        switch (method.toUpperCase()) {
            case 'POST':
                return postApi(endpointURL, body);
            case 'PUT':
                return putApi(endpointURL, body);
            case 'PATCH':
                return patchApi(endpointURL, body);
            case 'DELETE':
                return deleteApi(endpointURL);
            default:
                return Promise.resolve();
        }
    };

    return [trigger, state];
};
