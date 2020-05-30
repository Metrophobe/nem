let wireup = () => {
  let button = document.getElementById("button");
  let car = document.getElementById("car");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    fetch("/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car: car.value }),
      mode: "cors",
      cache: "default",
    }).then((response) => {
      console.log(response);
      location.reload();
    });
  });
  let carList = document.getElementById("cars");
  Array.from(carList.children).forEach((element) => {
    element.addEventListener("click", () => {
      fetch("/", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: element.id }),
        mode: "cors",
        cache: "default",
      }).then((response) => {
        console.log(response);
        location.reload();
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  wireup();
});
