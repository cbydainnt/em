
export function localSet(k: string, v: any) {
    try {
        localStorage.setItem(k, v);
    } catch (e) {
        console.warn(`Failed to save ${k} to localStorage: ${e}`);
    }
}

export function localGet(k: string, def: any = null): any {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        console.warn(`Failed to load ${k} from localStorage: ${e}`);
    }

    return def;
}

export function localRemove(k: string) {
    try {
        return localStorage.removeItem(k);
    } catch (e) {
        console.warn(`Failed to remove ${k} from localStorage: ${e}`);
    }
}
