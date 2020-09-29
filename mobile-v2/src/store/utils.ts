interface StateModule {
    actions: any,
    reducer: any,
    selector: (state: any) => any
}

export const moduleFactory = (actions: any, reducer: any, selector: (state: any) => any): StateModule => ({
    actions,
    reducer,
    selector
})