async function crawlerCoffee() {
  let textResult;
  const result = await axios
    .get("http://localhost:8080/save/coffee")
    .catch((err) => {
      console.log(err);
    });
  for (data of result.data) {
    textResult += `name : ${data.name} img : ${data.img}  ,`;
  }

  document.getElementById("textbox").value = textResult;
}
