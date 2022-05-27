import axios from "axios";

const URL_ORDER = "http://localhost:8088/api/v1/orders";

class OrderService {

    getAll(){
        return axios.get(URL_ORDER + "/list", {
        });
    }
    // delete(id){
    //     return axios.delete(URL_ORDER + "/delete/" + id)
    // }
}

export default new OrderService();