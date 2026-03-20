console.log("Heyyyyy");

// Resize window event listener
window.addEventListener("resize", function () {
  let grayScale = Math.random() * 255;
  document.body.style.backgroundColor = `rgb(${grayScale}, ${grayScale}, ${grayScale})`;
});

// Key event listener
window.addEventListener("keydown", function (event) {
  let key = event.key;
  console.log(key);
  if (key == "b") {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let ball = document.querySelector(".ball");
    ball.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
});
