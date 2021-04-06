import { makeRequest } from "../authHelpers.js"
import Auth from "./auth.js"

let accessToken = "";

await makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
}).then(function(result) {
    accessToken = result.accessToken;
});

console.log(accessToken);

const submitButton = document.querySelector("submit", () => {
    console.log("submitted");
});

