const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (input.value === "") {
    alert("You must write something!!");
  } else {
    const createNode = document.createElement("li");
    const createText = document.createTextNode(input.value);
    createNode.appendChild(createText);
    ul.appendChild(createNode);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    createNode.appendChild(span);

    span.addEventListener("click", () => {
      ul.removeChild(createNode);
    });
    li.addEventListener("click",()=>{
        createText.style.textDecoration = "line-through";
    })

    input.value = "";
  }
});
