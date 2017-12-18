export interface AsyncActionInterface<TData> {
    (dispatch: Function): Promise<TData>;
}