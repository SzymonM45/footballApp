const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
    const call = async<R, P = Record<string, unknown>>(url:string, method: 'GET' | 'POST', payload?: P):Promise<R> => {
        const fetchConfig = {
            method, 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: payload ? JSON.stringify(payload) : undefined,
        }
        try {
            const response = await fetch(`${API_URL}${url}`, fetchConfig);
            if(response.ok) {
                const data: R = await response.json();
                return data
            } else {
                const apiError: string = await response.text();
                throw new Error(apiError)
            }
        } catch(e) {
            console.log('Error', e);
            throw new Error('Wystąpił błąd')
            
        } 

         };

       
    const apiGet = async<R>(url:string) => {
        return await call<R>(url,'GET')
    }
    const apiPost = async<R,P>(url: string, payload: P) => {
        return await call<R, P>(url, 'POST', payload);
     }
    return {
        apiGet, 
        apiPost
    }
}