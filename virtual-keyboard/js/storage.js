export function set( name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}
export function get( name, subst = null) {
    // console.log('component storage.js ', window.localStorage)
    return JSON.parse( window.localStorage.getItem(name) || subst)
}
export function delet(name) {
    localStorage.removeItem(name);
}

