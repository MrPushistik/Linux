const form = document.querySelector(".auth");

form.onsubmit = (e) => {
    e.preventDefault();

    const login = form.querySelector("#login").value;
    const password = form.querySelector("#password").value;

    command = "/user/login";
    axios.post(serverURL + command, {login: login, password: password})
    .then(res=>{
        e.target.reset();
        createAlert("Вход выполнен успешно");
        switch((JSON.parse(localStorage.getItem("user"))).role){
            case "ADMIN": window.location.href="/admin.html"; break;
            case "VOLUNTEER": window.location.href="/volunteer.html"; break;
        }
    })
    .catch(err=>{console.log(err); createAlert(err.response.statusText + ", " + err.response.status, err.response.data.message), e.target.reset()});
}
