import createController from "./controller.js";
import createClient from "./client.js";
import createView from "./view.js";
import store from "./store.js"
    
window.onload = () => {
    const client = createClient();
    const view = createView();
    createController(client, view, store).startApp();
}


