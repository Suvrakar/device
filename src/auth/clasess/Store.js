export class LocalWebStorage{

    getItem(key) {
        return localStorage.getItem(key);
    }
    setItem(key, value){
        localStorage.clear()
        localStorage.setItem(key, value);
    }
    removeItem(key){
        localStorage.removeItem(key);
    }

    getlength() {
        return localStorage.length;
    }

    key(index) {
        return localStorage.key(index);
    }
}
