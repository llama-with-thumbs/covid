export function set( name, value) {
    window.localStorage.setItem(name, JSON.stringify());
}
export function get( name, subst = null) {
    return JSON.parse( window.localStorage.getItem(name) || subst)
}
export function delet(name) {
    localStorage.removeItem(name);
}

