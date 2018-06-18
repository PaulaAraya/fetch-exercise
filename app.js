window.onload = () => {
  const btnDoges = Document.getElementById("dogeReceptorBtn");
  btnDoges.addEventListener("click", () =>{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) { 
        const dogeResponse = JSON.parse(xhttp.responseText); 
        const dogeReceptorDiv = document.getElementById("dogeReceptor");
        for (let dogeIndex = 0; dogeIndex < dogeResponse.length; dogeIndex++) {
          const dogeImg = document.createElement('img'); 
          dogeImg.src = dogeResponse[dogeIndex];
          dogeReceptorDiv.appendChild(dogeImg);
        }
      }
    };
    xhttp.onerror = () => {
    }
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true", true); 
    xhttp.send();
    console.log("Holi soy doge");
   });
  
  const btnCates = document.getElementById(catesReceptorBtn);
  btnCates.addEventListener("click", () => {
  
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`) //Recibe la URL donde se va a hacer la consulta
      .then((response) => { //Este then es de la promesa del fetch
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Mala respuesta de gatitos");
        }
      }).then((catesJson) => { //recibimos el JSON en este punto
        //Este then es de la promesa de response.json()
        const cateReceptorDiv = document.getElementById("cateReceptor");
        for (let cateIndex = 0; cateIndex < catesJson.length; cateIndex++) {
          const cateImg = document.createElement('img'); //Aquí "almaceno" las imágenes
          cateImg.src = catesJson[cateIndex];
          cateReceptorDiv.appendChild(cateImg);
        }
      })
      .catch((error) => {
        console.error("Holi soy un error " + error);
      });
  });
  
  const btnAnimal = document.getElementById("animalReceptorBtn");
  btnAnimal.addEventListener( "click", () => {
    
    Promise.all([
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`),
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`),
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/birds?count=10&urls=true&httpsUrls=true`)
    ]).then((responses) => {
      return Promise.all(
        responses.map(
          (response) => {
            return response.json();
          }
        )
      );
    }).then((catesDogesJson) => {
      console.log("Respuesta en paralelo > " + JSON.stringify(catesDogesJson));
      const animalReceptorDiv = document.getElementById("animalReceptor");
      catesDogesJson.forEach((jsonElement)=>{
          jsonElement.forEach((animal)=>{
              const animalImg = document.createElement("img");
              animalImg.src = animal;
              animalReceptorDiv.appendChild(animalImg);
          });
      }); //Con forEach
    }).catch((error) => {
  
    });
  });  
};



