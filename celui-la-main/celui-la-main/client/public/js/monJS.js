/* SECTION JavaScript */



function montrer(id){
  document.getElementById(id).style.display='block';
}

function cacher(id){
  document.getElementById(id).style.display='none';
}


// Fonction pour créer le modèle d'une carte

function buildTable(film) {

  var strDivCard="<div class='col-sm-3'>"
                +" <div class='card'>"
                +"   <div class='card-body'>"
                +"       <img src = '"+film.posterUrl+"' alt= 'Not Found' onerror=\"this.src='client/public/images/image.jpeg';\">"
                +"       <p>"+film.title+" ("+film.year+")</p>"
                +"       <p>"+film.runtime+" min</p>"
                +"       <p>";
/*
  for (g of film.genres)
    strDivCard += g +' ';

  let txtVisible = film.plot.substring(0,120);
  
  
  if (film.plot.length>120)
   txtVisible += '...';
  */  
  strDivCard +="       </p>"
                +"       <p>"+film.director+"</p>"
                +"       <p>"+film.actors+"</p>"
               // +"       <p>"+txtVisible+"</p>"
                +"       <button type='button' class='btn btn-primary btn-lg'> Bande-annonce </button>"
                +"       <button type='button' class='btn btn-primary btn-lg'> Ajouter au Panier </button>"
                +"       <button type='button' class='btn btn-primary data-bs-toggle='modal' data-bs-target='#staticBackdrop1' onclick='modifierFilm(${i});'>Modifier film</button>"
                +"       <button type='button' class='btn btn-primary data-bs-toggle='modal' data-bs-target='#staticBackdrop2' onclick='supprimerFilm(${i});'>Supprimer film</button>"           
              
                +"   </div>"
                +"  </div>"
                +"</div>";
                
  return (strDivCard);

}

// Fonction pour afficher au chargment de la page les catégories de listeCategories dans le drop-down menu "Lister par catégorie"

/*function chargerCategories(){
  var cc = document.getElementById("categories");
  for(let uneCategorie of listeCategories){
      cc.innerHTML += "<li><a class='dropdown-item categorie' href='#'>"+uneCategorie+"</a></li>";
  }
}
*/
// Fonction pour afficher les 15 premiers films de listeFilms lorsqu'on clique sur le logo ou boutton d'Acceuil
function addCategs() { // add la categorie selectionne

    let selCategs = document.getElementById("categories");

    for (let i = 0; i < selCategs; i++) {



    }
    for (let uneCategorie of listeCategories) {
        selCategs.options[selCategs.options.length] = new Option(uneCategorie, uneCategorie);
    }
}

function createCardgroup()
{
    var strfilms= "";
    var cg = document.getElementById("CardGroup")
    for (let i = 0; i < 15; i++) {
          strfilms+=buildTable(listeFilms[i]);
    }
    cg.innerHTML=strfilms;
}

// Fonction pour afficher les tout les films de listeFilms lorsqu'on clique sur le boutton Lister

function chargerToutLesFilms()
{
    options.dataSource= listeFilms;
    container.pagination(options);
    /*var strfilms= "";
    var cg = document.getElementById("CardGroup")
    for (let i = 0; i < listeFilms.length; i++) {
          strfilms+=createCard(listeFilms[i]);
    }
    cg.innerHTML=strfilms;*/
}


// Fonction pour filtrer les cartes affichées selon la catégorie choisie

function chargerFilmsDeCategorie(categ)
{
    var strfilms= "";
    var resultats= [];
    var cg = document.getElementById("CardGroup")
    for (unfilm of listeFilms){
      for (i=0;i<unfilm.genres.length;i++)
        if (unfilm.genres[i] == categ) {
          resultats.push(unfilm);
          //strfilms+=createCard(unfilm);
        }         
    }
    //cg.innerHTML=strfilms;
    options.dataSource= resultats;
    container.pagination(options);
}

// VERSION DU TP1














//search by

$('#search-input').on('keyup', function () {
    var value = $(this).val()
    console.log('Value:', value)
    var resultats = searchTable(value, listeFilms)
    //buildTable(data)
    options.dataSource= resultats;
    container.pagination(options);
})

function searchTable(value, data) { // filtrer une data 
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        var name = data[i].name.toLowerCase()

        if (name.includes(value)) {
            filteredData.push(data[i])

        }
    }

    return filteredData
}

// fonction poour rechercher un film 

function rechercher() { 
    var search = document.getElementById("search").value; //$('#search')
    resultats = searchTable1(search, listeFilms)
    options.dataSource= resultats;
    container.pagination(options); 
}


// afficher film selon la recherche voulu ( titre,acteur, plot)

function searchTable1(value, data) { 
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        title = data[i].title.toLowerCase()
        actors = data[i].actors.toLowerCase()
        plot = data[i].plot.toLowerCase()
        //  var genres = data[i].title.toLowerCase()

        if (title.includes(value) || actors.includes(value) || plot.includes(value)) {
            filteredData.push(data[i])

        }

    }

    return filteredData
}

//order by

$('th').on('click', function () {
    var column = $(this).data('colname')
    var order = $(this).data('order')
    var text = $(this).html()
    text = text.substring(0, text.length - 1);



    if (order == 'desc') {
        listeFilms = listeFilms.sort((a, b) => a[column] > b[column] ? 1 : -1)
        $(this).data("order", "asc");
        text += '&#9660'
    } else {
        listeFilms = listeFilms.sort((a, b) => a[column] < b[column] ? 1 : -1)
        $(this).data("order", "desc");
        text += '&#9650'
    }

    $(this).html(text)
    buildTable(listeFilms) // buildTable pour mon html 
})

// fonction pour ajouter un nouveau film 

function addFilm() { 
 
    let id = document.getElementById('numero').value;
    let title = document.getElementById('titre').value;
    let year = document.getElementById('annee').value;
    let runtime = document.getElementById('duree').value;
    let genres = document.getElementById('categorie').value;
    let director = document.getElementById('directeur').value;
    let actors = document.getElementById('acteur').value;
    let plot = document.getElementById('description').value;
    //   let posterUrl = document.getElementById('photo').value;



    let unFilm = { 
      "id": id, "title": title, "year": year, "runtime": runtime, "genres": genres, "director": director, "actors": actors, "plot": plot };
    listeFilms.push(unFilm);
    options.dataSource= listeFilms;
    container.pagination(options);


}

// fonction pour supprimer le film

function supprimerFilm  (index)  {   // supprimer le film
    document.getElementById('numero2').value = listeFilms[index].id;
    console.log(index)
}
function supprimerFilm1 (){        
    id=document.getElementById('numero2').value;
    console.log(id)
    var index=listeFilms.findIndex(f=>f.id==id);
    console.log(index)
    listeFilms.splice(index, 1);
    buildTable(listeFilms);
    }
    
//Fonctions pr modifier un film

function modifierFilm(index) { // pour prendre l index du film cliquer
    console.log(index)
    document.getElementById('numero1').value = listeFilms[index].id;
    document.getElementById('titre1').value = listeFilms[index].title;
    document.getElementById('annee1').value = listeFilms[index].year;
    document.getElementById('duree1').value = listeFilms[index].runtime;
    document.getElementById('categorie1').value = listeFilmslisteFilms[index].genres;
    document.getElementById('directeur1').value = listeFilms[index].director;
    document.getElementById('acteur1').value = listeFilms[index].actors;
    document.getElementById('description1').value = listeFilms[index].plot;


}
function modifierFilm1() { // modifier le film numero1 = nouveau film 
        var id = document.getElementById('numero1').value;
        var index=listeFilms.findIndex(f=>f.id==id);
        console.log(id);
        console.log(index);

        listeFilms[index].id=document.getElementById('numero1').value;
        listeFilms[index].title=document.getElementById('titre1').value;
        listeFilms[index].year=document.getElementById('annee1').value;
        listeFilms[index].runtime=document.getElementById('duree1').value;        
        listeFilms[index].genres=document.getElementById('categorie1').value;
        listeFilms[index].director=document.getElementById('directeur1').value;
        listeFilms[index].actors=document.getElementById('acteur1').value;
        listeFilms[index].plot=document.getElementById('description1').value ;
        buildTable(listeFilms);

     }
    

// Fonction pr trier des films

    let listerTousLesFilms = (duree,titre, annee,ordeDeTri) => { // filtrer les film sort par runtime, year and name
      //  if (listeFilmsDisponible){
            let contenu = `<div class="row row-cols-4">`;
            if (annee >= 0){
                 if (ordeDeTri == 'D'){
                    listeFilms.sort((a,b) => parseInt(b.year)-parseInt(a.year));//ordre décroissant
                 }else { 
                    listeFilms.sort((a,b) => parseInt(a.year)-parseInt(b.year));// cas ordreDeTri == 'C' ordre croissant
                 }
                    // Par année
                    for (unFilm of listeFilms){
                        if (parseInt(unFilm.year) > annee){
                            contenu+=buildTable(data(unFilm));
                        }else if (annee == 0) {
                            contenu+=buildTable(data(unFilm));
                        }
                    }   
            }else if(titre != null){// if (titre == true)
                if (ordeDeTri == 'D'){
                    listeFilms.sort((a,b) => (b.title > a.title)?1:-1);//ordre décroissant
                 }else { 
                    listeFilms.sort((a,b) => (b.title < a.title)?1:-1);// cas ordreDeTri == 'C' ordre croissant
                 }
                // Par titre
                for (unFilm of listeFilms){
                        contenu+=buildTable(data(unFilm));
                }
               
            } else if(duree >= 0){
                if (ordeDeTri == 'D'){
                    listeFilms.sort((a,b) => parseInt(b.runtime)-parseInt(a.runtime));//ordre décroissant
                 }else { 
                    listeFilms.sort((a,b) => parseInt(a.runtime)-parseInt(b.runtime));// cas ordreDeTri == 'C' ordre croissant
                 }
                    // Par année
                    for (unFilm of listeFilms){
                        if (parseInt(unFilm.runtime) > duree){
                            contenu+=buildTable(data(unFilm));
                        }else if (duree == 0) {
                            contenu+=buildTable(data(unFilm));
                        }
                    }   
            }
            contenu+= `</div>`;
            
    
            $('#contenu').html(contenu);//document.getElementById('contenu').innerHTML=contenu;
            
        }