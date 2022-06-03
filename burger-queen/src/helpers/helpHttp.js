export const helpHttp = () => {

    // function to request a fetch
    const customFetch = (endpoint, options) => { // fetch need to (route, options) to ejecute

        // Define header to fetch
        const defaultHeader = {
            accept: 'application/json',
        };

        // Add a Abort controller to stop requests when the server no fixed
        const controller = new AbortController();
        options.signal = controller.signal;

        // Add methods to fetch
        options.method = options.method || 'GET';
        options.headers = options.headers  ? { ...defaultHeader, ...options.headers } : defaultHeader;

        // Add to body to fetch - Change to string the file JSON
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        
        // Create the time to recive to a server answer to ejecute a fetch
        setTimeout(() => controller.abort(), 3000);

        // Ejecute to request fetch
        return fetch(endpoint, options)
        .then((res) =>
            res.ok
            ? res.json()
            : Promise.reject({
                err: true,
                status: res.status || '00',
                statusText: res.statusText || 'Ocurrió un error',
            })
        )
        .catch((err) => err);
    };

    // Fuction to get info into json file
    const get = (url, options = {}) => customFetch(url, options);

    // Fuction to post info into json file
    const post = (url, options = {}) => {
        options.method = 'POST';
        return customFetch(url, options);
    };
    // Fuction to put info into json file
    const put = (url, options = {}) => {
        options.method = 'PUT';
        return customFetch(url, options);
    };
    // Fuction to delete info into json file
    const del = (url, options = {}) => {
        options.method = 'DELETE';
        return customFetch(url, options);
    };

    return {
        get,
        post,
        put,
        del,
    };
};