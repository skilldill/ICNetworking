export const isFilled = (data: { [key: string]: any }) => {
    const truthyArr = Object.keys(data).map((key) => !!data[key]);
    
    return !truthyArr.includes(false);
}