const gitapi = "https://api.github.com/users/";
const main = document.querySelector("#form");
const input = document.querySelector("#input");

input.addEventListener("keyup", (event) => {
  if(event.key === "Enter" && input.value != ""){
    get(input.value);
    input.value = "";
  }
});
const get = async(username) =>{
  const response = await fetch(gitapi + username);
  const data = await response.json();
  console.log(data.message);
  if(data.message === "Not Found"){
    main.innerHTML = `
    <h1>
    User Not Found
    </h1>
    `
  }
  else{
  const card = `
  <div class = "info">
          <div>
            <img class = "photo" src = "${data.
              avatar_url
              }">
          </div>
            <div class = "user-info">
              <h2>${data.name}</h2>
              <p>${data.bio}
              </p>
              <ul class = "card">
                <li><strong>Following : ${data.following}</strong></li>
                <li><strong>Followers : ${data.followers}</strong></li>
                <li><strong>Repos : ${data.
                  public_repos
                  }</strong></li>
              </ul>
              <div id = "repos">
            </div>
          </div>
        </div>`
        main.innerHTML = card;
        getrepos(username);
                }
}
const getrepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(gitapi + username +"/repos");
  const data = await response.json();
  data.forEach(element => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = element.html_url;
    elem.innerText = element.name;
    elem.target = "_blank"
    repos.appendChild(elem);
  });
}
input.addEventListener("focusout" , (event) =>{
  if(input.value != ""){
    get(input.value);
    input.value = "";
  }
})
