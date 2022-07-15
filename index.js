const przychodyForm = document.getElementById("przychody-form");
const przychodyNazwa = document.getElementById("przychody-nazwa");
const przychodyKwota = document.getElementById("przychody-kwota");
const przychodyBtn = document.getElementById("przychody-btn");
const przychodyLista = document.getElementById("przychody-lista");

const sumaPrzychodow = document.getElementById("sumaprzychodow");
const sumaWydatkow = document.getElementById("sumawydatkow");

const msg = document.getElementById("msg");
let suma = 0;

let sumaprzychodow = 0;
let sumawydatkow = 0;
const przychody = [];
const wydatki = [];

function obliczenia() {
  const sumaWyd= wydatki.reduce(
    (acc, currentValue) => acc + Number(currentValue.kwota),
    0
  );
  sumaWydatkow.innerHTML = sumaWyd;
  const sumaPrzych = przychody.reduce(
    (acc, currentValue) => acc + Number(currentValue.kwota),
    0
  );
  sumaPrzychodow.innerHTML = sumaPrzych;
  const suma = sumaPrzych - sumaWyd;

  if (suma > 0) {
    msg.innerHTML = `Możesz jeszcze wydać ${suma} złotych`;
  } else if (suma < 0) {
    msg.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${suma} złotych`;
  } else {
    msg.innerHTML = `Bilans wynosi zero`;
  }
}
function sumowaniePrzychodow(przychod) {
  sumaprzychodow += Number(przychod);
  sumaPrzychodow.innerHTML = sumaprzychodow;
}

function sumowanieWydatkow(przychod) {
  sumawydatkow += Number(przychod);
  sumaWydatkow.innerHTML = sumawydatkow;
}

przychodyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const item = {
    name: przychodyNazwa.value,
    kwota: przychodyKwota.value,
    id: Math.random(),
  };
  przychody.push(item);

  obliczenia();
  getPrzychodyList();
});

function getPrzychodyList() {
  przychodyLista.innerHTML = "";
  przychody.forEach((element) => {
    const item = document.createElement("li");
    item.id = element.id;
    const content = document.createElement("span");
    content.textContent = `${element.name} - ${element.kwota}zł`;

    const edytujBtn = document.createElement("button");
    edytujBtn.classList.add('edit-btn')
    edytujBtn.textContent = "edytuj";
    edytujBtn.addEventListener("click", () => {
      item.removeChild(content);
      item.removeChild(edytujBtn);

      const nameInput = document.createElement("input");
      const amountInput = document.createElement("input");
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "zapisz";

      nameInput.value = element.name;
      amountInput.value = element.kwota;
      item.insertAdjacentElement(`afterbegin`, saveBtn);
      item.insertAdjacentElement(`afterbegin`, amountInput);
      item.insertAdjacentElement(`afterbegin`, nameInput);
      saveBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const amount = amountInput.value;

        const itemToChange = przychody.find(
          (przychod) => przychod.id === element.id
        );
        itemToChange.name = name;
        itemToChange.kwota = amount;

        obliczenia();
        getPrzychodyList();
      });
    });

    const usunBtn = document.createElement("button");
    usunBtn.textContent = "usuń";

    usunBtn.classList.add('delete-btn')

    
      usunBtn.addEventListener("click", () => {
        const indexToRemove = przychody.indexOf(element);
        przychody.splice(indexToRemove, 1)
      
      obliczenia();
        getPrzychodyList();

    });

    item.appendChild(content);
    item.appendChild(edytujBtn);
    item.appendChild(usunBtn);
    przychodyLista.appendChild(item);
  });
}
const wydatkiForm = document.getElementById("wydatki-form");
const wydatkiNazwa = document.getElementById("wydatki-nazwa");
const wydatkiKwota = document.getElementById("wydatki-kwota");
const wydatkiBtn = document.getElementById("wydatki-btn");
const wydatkiLista = document.getElementById("wydatki-lista");

wydatkiForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const item = {
    name: wydatkiNazwa.value,
    kwota: wydatkiKwota.value,
    id: Math.random(),
  };
  wydatki.push(item);

  obliczenia();
  getWydatkiList();
});
function getWydatkiList() {
  wydatkiLista.innerHTML = "";
  wydatki.forEach((element) => {
    const item = document.createElement("li");
    item.id = element.id;
    const content = document.createElement("span");
    content.textContent = `${element.name} - ${element.kwota}zł`;

    const edytujBtn = document.createElement("button");
    edytujBtn.textContent = "edytuj";
    edytujBtn.addEventListener("click", () => {
      item.removeChild(content);
      item.removeChild(edytujBtn);

      const nameInput = document.createElement("input");
      const amountInput = document.createElement("input");
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "zapisz";

      nameInput.value = element.name;
      amountInput.value = element.kwota;
      item.insertAdjacentElement(`afterbegin`, saveBtn);
      item.insertAdjacentElement(`afterbegin`, amountInput);
      item.insertAdjacentElement(`afterbegin`, nameInput);
      saveBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const amount = amountInput.value;

        const itemToChange = wydatki.find(
          (przychod) => przychod.id === element.id
        );
        itemToChange.name = name;
        itemToChange.kwota = amount;
        obliczenia();
        getWydatkiList();
      });
    });

    const usunBtn = document.createElement("button");
    usunBtn.textContent = "usuń";

    console.log(wydatki)

    usunBtn.addEventListener("click", () => {
      const indexToRemove = wydatki.indexOf(element);
      wydatki.splice(indexToRemove, 1)
      
      
    console.log(wydatki)
      obliczenia();
        getWydatkiList();

    });
    item.appendChild(content);
    item.appendChild(edytujBtn);
    item.appendChild(usunBtn);
    wydatkiLista.appendChild(item);
  });
}
