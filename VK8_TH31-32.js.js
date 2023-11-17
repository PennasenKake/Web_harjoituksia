

// Luokka Arvosana, joka tallentaa 
//oppiaineen, arvosanan ja suorituspäivämäärän
class Arvosana{
    constructor(oppiaine, arvosana, suorituspvm){
        this._oppiaine = oppiaine;
        this._arvosana = arvosana;
        this._suorituspvm = new Date(suorituspvm);

    }

    // Metodi tulosta tulostaa arvosanan tiedot
    tulosta() {
        console.log(`Oppiaine: ${this._oppiaine}, Arvosana: ${this._arvosana}, Suorituspäivämäärä: ${this._suorituspvm.toDateString()}`);
    }    

}

// Luodaan Oppilas-luokka
class oppilas{
    constructor(nimi,syntymavuosi,osoite,puhelinnumero){
        this._nimi = nimi;
        this._syntymavuosi = new Date(syntymavuosi, 0 , 1);
        this._osoite =osoite;
        this._puhelinnumero = puhelinnumero;
        this._arvosanat = [];
    }

    // Metodi laskeIka laskee oppilaan iän
    laskeIka() {
        const tanaan = new Date();
        const oppilaanSyntymavuosi = this._syntymavuosi.getFullYear();
        const ika = tanaan.getFullYear() - oppilaanSyntymavuosi;
        return ika;
    }

    
    // Metodi tulosta tulostaa oppilaan tiedot
    tulosta(){
        console.log(`${this._nimi} on synytynyt vuonna ${this._syntymavuosi.getFullYear()} 
         ja asuu osoitteessa ${this._osoite} 
         ja hänen puhelinnro on ${this._puhelinnumero} `);
    }

    // Getter-metodit jäsenmuuttujille
    get nimi(){
        return this._nimi;
    }
    get syntymavuosi(){
        return this._syntymavuosi;
    }
    get osoite(){
        return this._osoite;
    }
    get puhelinnumero(){
        return this._puhelinnumero;
    }
    
    // Setter-metodit jäsenmuuttujille
    set nimi(uusiNImimi){
        this._nimi = uusiNImimi;
    }
    set syntymavuosi(uusiVuosi){
        this._syntymavuosi = new Date(uusiVuosi, 0, 1)
    }
    set osoite(uusiOsoite){
        this._osoite = uusiOsoite;
    }
    set puhelinnumero(uusiNumero){
        this._puhelinnumero = uusiNumero;
    }
    // Metodi lisaaArvosana lisää uuden arvosanan
    lisaaArvosana(oppiaine, arvosana, suorituspvm) {
        if (arvosana >= 0 && arvosana <= 10) {
            this._arvosanat.push(new Arvosana(oppiaine, arvosana, new Date(suorituspvm)))
        }
        else{
            console.log("arvosana on virheellinen");
        }
    }
    // Metodi tulostaArvosana tulostaa kaikki arvosanat
    tulostaArvosana(){
        console.log(`${this._nimi}n arvosanat: `);
        for (const arvosana of this._arvosanat){
            arvosana.tulosta();
        }
    }
}

// Luodaan oppilas2-instanssi Oppilas-luokasta
const oppilas2 = new oppilas("Lumi Ukko", 1999, "Kotikatu 1", 12345678910);

// Kutsutaan tulosta-metodia oppilas2-instanssille
oppilas2.tulosta();
// Lasketaan ja tulostetaan oppilaan ikä
const ika = oppilas2.laskeIka();
console.log("Oppilas on vuotta " + ika + " vuotta vanha.");
//Lisätään arvosanat
oppilas2.lisaaArvosana("Matematiikka", 8, "2023-09-24");
oppilas2.lisaaArvosana("Tietojenkäsittely", 5, "2023-09-28");
oppilas2.lisaaArvosana("Ohjelmointi", 7, "2023-10-05");
// Tulostetaan arvosanat
oppilas2.tulostaArvosana();

