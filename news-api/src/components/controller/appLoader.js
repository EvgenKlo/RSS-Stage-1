import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '', // получите свой ключ https://newsapi.org e1e32f2036b8400f9b4f8a31e07b3e87/
        });
    }
}

export default AppLoader;
