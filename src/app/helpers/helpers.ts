export function isEmptyObj(obj:any) {
    for (var prop in obj) { 
        return false; 
    } 
    return true; 
}