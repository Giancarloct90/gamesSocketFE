import view from "../view/home.html";

export const home = async () => {
    let div = document.createElement('div');
    div.innerHTML = view;
    return div;
}