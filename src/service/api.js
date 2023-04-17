import axios from "axios";
 const URL = 'http://localhost:5000'; 
const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};

export function getPlaces(body) {
    console.log(body);
    const options = { params: body };
    const requisition = axios.get(`${URL}/search`, options);
    return requisition;
}

export function getPlaceById(placeId) {
    console.log("placeId: ", placeId);
    const requisition = axios.get(`${URL}/searchById/${placeId}`);
    return requisition;
}

export function getAllCategories() {
    const requisition = axios.get(`${URL}/allCategories`);
    return requisition;
  }

export function postSignIn(body){
    const requisition = axios.post(
        `${URL}/sign-in`,
        body
    );
    return requisition;
}

export function postSignUp(body){
    const requisition = axios.post(
        `${URL}/sign-up`,
        body,
    );
    return requisition;
}

export function putCategories(token, body){
    const requisition = axios.put(
        `${URL}/categories`,
        body, 
        headerCreator(token)
    );
    return requisition;
}


setInterval(atualizarStatus, 5000);

function atualizarStatus() {
    let token = localStorage.getItem("token");
    if(token !== '')
    {
        axios.post(`${URL}/status`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then().catch(()=>{localStorage.setItem('token', '')});
    }
    
  };