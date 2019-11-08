import {fetch} from 'whatwg-fetch'

export default class ApiRequest {

    constructor(path) {
        this.endpoint = path;
        this.path = "http://localhost" + path;
        this.method = "GET";
        this.context = {};
    }

    setContext(context) {
        this.context = context;
        return this;
    }

    post() {
        this.method = "POST";
        return this;
    }

    auth() {
        this.context.token = location.href.split("#")[1];
        return this;
    }

    run() {
        let body = null;
        if (this.method.toLocaleLowerCase() === "post") body = JSON.stringify(this.context);
        const start = new Date();
        return new Promise((accept, reject) => {
            fetch(this.path, {
                method: this.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }).then(response => {
                response.json().then(data => {
                    console.log(this.method + ": " + this.endpoint + " (" + (new Date().getTime() - start.getTime()) + " MS)");
                    if (data.success) {
                        accept(data.data);
                    } else {
                        reject(data.errors);
                    }
                });
            })
                .catch(reject)
        });
    }

}
