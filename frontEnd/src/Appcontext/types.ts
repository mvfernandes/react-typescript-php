export interface IREDUCERS_ACTION {
    type: string
    payload: Object,
    reducer: string
};

export interface ICombinedReducers {
    [key: string]: Function
};