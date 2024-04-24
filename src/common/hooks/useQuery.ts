import { useEffect, useReducer } from 'react';
import * as request from '../lib/httpRequest';

interface State {
    isLoading: boolean;
    data: any;
    error: string | null;
}

interface Action {
    type: string;
    payload?: any;
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

export const useQuery = (endpointURL: string, skip?: Record<string, any>, body?:any) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const trigger = async (url: string) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.get(url, body);
            dispatch({
                type: 'API_SUCCESS',
                payload: response?.data?.data,
            });
        } catch (error) {
            dispatch({
                type: 'API_FAILED',
                payload: 'Something when wrong. Please try again!',
            });
        }
    };

    const reload = () => {
        trigger(endpointURL);
    };

    function hasOneNullValue(obj: Record<string, any>): boolean {
        if (Object.keys(obj).length === 0) {
            return false;
        }

        return Object.values(obj).some((value) => !value);
    }

    useEffect(() => {
        if (skip) {
            if (!hasOneNullValue(skip)) {
                trigger(endpointURL);
            }
        } else {
            trigger(endpointURL);
        }
    }, [endpointURL]);

    return { ...state, isLoading: state.isLoading,reload};
};
