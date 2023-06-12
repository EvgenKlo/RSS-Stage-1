import { ApiKey, Callback, Options, RequestOptions } from "../../types/types";

class Loader {

    constructor(public baseLink: string, public options: ApiKey) {
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestOptions,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (value !== null && value !== undefined) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: Callback<T>,
        options = {}
        ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
