document.addEventListener("DOMContentLoaded", function() {
    const memeImg = document.querySelector(".memeImg");
    const generateButton = document.querySelector("button");
  
    function memeGenerator() {
        fetch("https://meme-api.com/gimme")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.title);
                memeImg.src = data.url;
            });
    }
  
    generateButton.addEventListener("click", memeGenerator);
  });
  