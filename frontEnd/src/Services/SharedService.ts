import isLocalHost from "../Utils/isLocalHost";

// const dev = process.env.NODE_ENV === "development";
const dev = window.location.hostname === "localhost";

export class SharedService {

    private baseURL = dev ? "http://localhost:9001/backEnd" : "/seusite/api";
    private genericMessage = 'Houve um erro, se persistir, por favor, contate o suporte.';

    private async _fetchApi(method: string, url: string, body?: any) {
        try {
            const data = await fetch(this.baseURL + url, {
                method,
                body
            });
            const json = await data.json();
            if (json.expired) {
                // window.location.reload();
                throw Error('Sessão expirada');
            }
            return json;
        }
        catch (err) {
            if (isLocalHost) {
                console.log('Erro em _fetchApi()');
                console.log(err);
            }
            throw err;
        }
    }

    public getJson<T>(url: string) {
        return new Promise<T>((resolve, reject) => {
            this._fetchApi('GET', url)
                .then((response) => {
                    if (response.Success) {
                        return resolve(response);
                    } else {
                        return reject(response.Message || this.genericMessage);
                    }
                })
                .catch(() => reject(this.genericMessage))
        });
    }

    public deleTe<T>(url: string) {
        return new Promise<T>((resolve, reject) => {
            this._fetchApi('DELETE', url)
                .then((response) => {
                    if (response.Success) {
                        return resolve(response);
                    } else {
                        return reject(response.Message || this.genericMessage);
                    }
                })
                .catch(() => reject(this.genericMessage))
        });
    }

    public postJson<TRequest, TResponse>(url: string, body: TRequest) {
        return new Promise<TResponse>((resolve, reject) => {
            this._fetchApi('POST', url, JSON.stringify(body))
                .then((response) => {
                    if (response.Success) {
                        return resolve(response);
                    } else {
                        return reject(response.Message || this.genericMessage);
                    }
                })
                .catch(() => reject(this.genericMessage))
        });
    }

    public putJson<TRequest, TResponse>(url: string, body: TRequest) {
        return new Promise<TResponse>((resolve, reject) => {
            this._fetchApi('PUT', url, JSON.stringify(body))
                .then((response) => {
                    if (response.Success) {
                        return resolve(response);
                    } else {
                        return reject(response.Message || this.genericMessage);
                    }
                })
                .catch(() => reject(this.genericMessage))
        });
    }
}