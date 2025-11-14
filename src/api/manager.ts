import axios from "@/axios";
import type { AxiosPromise } from "axios";

function login(username: string, password: string): AxiosPromise<any> {
    return axios.post('/admin/login', {
        username,
        password
    })
}

export {
    login
}