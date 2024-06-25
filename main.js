function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

function getCursor(event) {
  const x = event.clientX;
  const y = event.clientY;
  const position = `X: ${x} Y: ${y}`;
  console.log(position);
}

const body = document.body;
const debouncedGetCursor = debounce(getCursor, 300);

body.addEventListener("mousemove", (e) => {
  debouncedGetCursor(e);
});

const input = document.querySelector("input");
const API = "https://dummyjson.com/products";
const loc = window.location.href;
console.log(loc);

const container = document.querySelector("#container");
const fetcher = async (api, value) => {
  try {
    if (value) {
      let response = await fetch(`${api}?category=${value}`);
      const data = await response.json();
      console.log(data.products);
      const container = document.getElementById("container");
      container.innerHTML = `
      <h1>Search Results</h1>
      ${data.products.map((item) => {
        return `<span>${item.title}</span>`;
      })}
      `;
    }
  } catch (error) {
    console.error(error);
  }
};
const debouncedInput = debounce(fetcher, 300);

debouncedInput();

input.addEventListener("input", (e) => {
  debouncedInput(API, e.target.value);
});
