
// JS. SISÄLTÄÄ SIVUJEN KAIKKI TOIMINNOT
// KUTEN kuten tehtävien luominen, syötetarkistukset, tehtävien lajittelu, 
//taulukon päivittäminen, valmiiden tehtävien lukitus 
// JA Valmiit tippuvat listan pohjalle kun suorittaa lajittelun


let tehtavat = []; // Alusta tehtävien säilyttämiseen

// LUODAAN TEHTÄVILLE AUTTOMMAATTINEN ID MIKÄ JATKUU LOPUTTOMIIN
const generateID = idGenerator();

function* idGenerator() {
    let id = 1 ;
    while(true) {
        yield id++ ;
    }
}

let lajittelesuunta = true ;

function luoTehtavaJaLisaaLista(){
    let TehtäväNimi = document.getElementById('Tehtävänimi').value;
    let Prioriteetti = document.getElementById('Prioriteetti').value;
    let tavoitepvm = document.getElementById('tavoitepvm').value;

    let tanaan = new Date();
    let syotepvm = new Date(tavoitepvm);
    // TARKISTAA ONKO SYÖTE MENNEISYYDESSÄ
    if(syotepvm < tanaan) {
        window.alert("Tarkista päivä");
        return;
    } 
  
    // Tarkistetaan, että tehtävän nimi, prioriteetti ja tavoitepvm on annettu
    if(TehtäväNimi && Prioriteetti && tavoitepvm){
        let tehtava = {
            id: generateID.next().value,
            Tehtävänimi: TehtäväNimi,
            Prioriteetti: Prioriteetti,
            tavoitepvm: tavoitepvm,
            tila: 'Kesken',
        }
        tehtavat.push(tehtava);
        paivitaTehtavaLista();
    }
    else{
        window.alert("tarkista tehtävä!");
    }
}


    function paivitaTehtavaLista(){
        let taulukko = document.getElementById("tehtavalista");

        while(taulukko.rows.length > 1) {
            taulukko.deleteRow(1);
        }

        for(let i = 0; i < tehtavat.length; i++){
            let tehtava = tehtavat[i];

            let rivi = taulukko.insertRow();

            let soluID = rivi.insertCell(0);
            soluID.textContent = tehtava.id;

            let soluTehtavaNimi = rivi.insertCell(1);
            soluTehtavaNimi.textContent = tehtava.Tehtävänimi;

            let soluPrioriteetti = rivi.insertCell(2);
            soluPrioriteetti.textContent = tehtava.Prioriteetti;

            let soluTavoite = rivi.insertCell(3);
            soluTavoite.textContent = tehtava.tavoitepvm;

            // LUODAAN CHECKBOX JOLLA MERKATAAN TEHTÄVÄ VALMIIKSI
            let soluTila = rivi.insertCell(4);
            let tilaPainike = document.createElement('input');
            tilaPainike.type = 'checkbox';
            tilaPainike.textContent = "Valmis";
            // Tarkista, onko tehtävä jo valmis, 
            //ja merkitse checkbox valituksi sekä poista muokkausmahdollisuus
            if (tehtava.tila === "Valmis"){
                tilaPainike.checked = true;
                tilaPainike.disabled = true;
            }
            // Lisää tapahtumankäsittelijä klikkaukselle, 
            //joka merkitsee tehtävän valmiiksi
            tilaPainike.addEventListener('click', function(){
                if(tehtava.tila === "Kesken"){
                    tehtava.tila = "Valmis";
                    tilaPainike.disabled = true;
                    paivitaTehtavaLista();
                }
            });
            
            soluTila.appendChild(tilaPainike);

            // YLIVIIVAA VALMIIN TEHTÄVÄN
            if(tehtava.tila ==="Valmis"){
                rivi.style.textDecoration = "line-through";
                rivi.style.color = "grey";
            }
        }
    }

    function lajitteleTehtavat(sarake){
        tehtavat.sort((a,b) => {
            if (a.tila === "Valmis" && b.tila === "Kesken") return 1; // Valmiit menevät loppuun
            if (a.tila === "Kesken" && b.tila === "Valmis") return -1;
            if (a[sarake] < b[sarake]) return lajittelesuunta ? 1 : -1 ;
            if (a[sarake] > b[sarake]) return lajittelesuunta ? -1 : 1 ;
            return 0;
        });
        lajittelesuunta = !lajittelesuunta;
        paivitaTehtavaLista();
    }
    


    // Lisää painikkeelle tapahtumankäsittelijä, joka kutsuu luoTehtavaJaLisaaLista-funktiota
    document.getElementById('lisaaTehtava').addEventListener('click', 
    luoTehtavaJaLisaaLista);



