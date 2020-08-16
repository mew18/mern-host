import 'whatwg-fetch';

class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:420/product').then(res => {
                resolve(res.json());
                // reject
            })
        })

        return promise;
    }
}

export default HttpService