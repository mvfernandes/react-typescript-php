export interface BaseResponse<T> {
    Data:T,
    Success: boolean,
    Message: string,
}