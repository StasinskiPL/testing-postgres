const btn = document.getElementById("btn");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const form = document.getElementById("form");
const fetchBtn = document.getElementById("fetch");
const usersSection = document.getElementById("users");

btn.addEventListener("click", (e) => {
  e.preventDefault();


  if (firstName.value && lastName.value && age.value) {
    axios.post("http://localhost:4000/addpost", {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
    }).then(res=>console.log(res)).catch(e=>console.log(e));
    form.reset();
  }
});


fetchBtn.addEventListener("click",()=>{
    axios.get("http://localhost:4000/getposts").then(data=>{
        console.log(data)
        const {rows} = data.data;
        usersSection.innerHTML= "";
        rows.forEach(row=>{
            const displayRow = document.createElement("div")
            displayRow.classList.add("user")
            displayRow.innerHTML = `<h3>${row.first_name}  ${row.last_name} ${row.age}</h3>`
            usersSection.appendChild(displayRow)
        })
    }).catch(err=>{console.log(err)})
})

