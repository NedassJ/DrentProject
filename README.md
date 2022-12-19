# DrentProject

 













INFORMATIKOS FAKULTETAS


T120B165 Saityno taikomųjų programų projektavimas


DRent – dronų sandėliavimo informacinė sistema
Projekto ataskaita








Studentas:	Nedas Janonis, IFK-0
Dėstytojai:	Baltulionis Simonas
Tamošiūnas Petras









KAUNAS 2022
 
Turinys
1.	Sistemos paskirtis
2.	Sistemos architektūra
3.	Naudotojo sąsajos projektas
4.	API specifikacija
5.	Išvados

 
Sistemos paskirtis

1.	Sprendžiamo uždavinio aprašymas 1.1. Sistemos paskirtis Sistemos paskirtis – suteikti galimybę sandėlio darbuotojams peržiūrėti įrangos sąrašą, pridėti būsenos pakeitimą apie konkretų sandėlio droną (kuomet atliekamas remontas, ar kita.), suteikti galimybę sistemos administratoriui pridėti naujus sandėlius, pridėti daiktus į sandėlius, juos redaguoti, trinti. Suteikti galimybę svečiui peržiūrėti esamų dronų sąrašą konkrečiame sandėlyje bei drono būseną (komentarus) 1.2. Funkciniai reikalavimai 
Neregistruotas sistemos naudotojas galės:
2.	Peržiūrėti platformos reprezentacinį puslapį;
3.	Peržiūrėti sandėlių sąrašą;
4.	Peržiūrėti dronų sąrašą konkrečiame sandėlyje;
5.	Užsiregistruoti sistemoje.
Registruotas sistemos naudotojas galės:
1.	Atsijungti nuo sistemos;
2.	Prisijungti prie sistemos;
3.	Pridėti komentarą apie konkretų droną;
4.	Redaguoti savo komentarą;
5.	Ištrinti savo komentarą;
Administratorius galės:
1.	Sukurti/redaguoti/trinti sandėlį;
2.	Sukurti/redaguoti/trinti dronus;

Sistemos architektūra



UML klasių diagrama:
 
Naudotojo sąsaja
Naudotojo sąsajos langų wireframe‘ai ir juos atitikantys realizuoti langai sistemoje. Nuotraukos išdėstytos taip: pirma lango wireframe, o po juo realizuotas langas.
Prisijungimas, registracija:
 
 

 

 

Pagrindinis langas pagal tris skirtingas roles: svečio, vartotojo, administratoriaus:
 

 

 

 

 

 
Sandėlio pasirinkimo langas
 

 
Dronų sąrašo langas
 
 

 
Komentarų peržiūros langas
 

 
Drono pridėjimo langas
 
 
Komentaro pridėjimo langas
 
 
Sandėlio pridėjimo langas
 

 


API specifikacija
Pirmasis objektas – warehouse, bei jo metodai.
GET warehouses list
Grąžina sandėlių objektų sąrašą. Nuoroda - http://localhost:5082/api/warehouses
Papildoma informacija:
	Atsakymo formatas – JSON
	Reikalinga autentifikacija – ne
	Metodo parametrai – nėra
Pavyzdys: GET http://localhost:5082/api/warehouses
Atsakymas:  
/api/warehouses/{id} GET One
Grąžina vieną sandėlį pagal nurodytą id.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – ne
	Metodo parametrai – sandėlio id
Pavyzdys: GET http://localhost:5082/api/warehouses/11
Atsakymas: {
    "id": 11,
    "name": "Kauno",
    "description": "Jau yra",
    "creationDate": "2022-12-15T17:01:52.115149"
}
/api/ warehouses POST Create
Pridėta sandėlio objektą į sąrašą.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – pavadinimas, aprašymas
Pavyzdys: POST http://localhost:5082/api/warehouses
Atsakymas: {
    "id": 18,
    "name": "Vilniaus punktasAA",
    "description": "Paneriu g. 1-5",
    "creationDate": "2022-12-16T13:12:16.1735169Z"
}
/api/ warehouses/{id} PUT/PATCH Modify
Redaguoja konkretaus sandėlio informaciją.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – aprašymas
Pavyzdys: PUT http://localhost:5082/api/warehouses/11
Atsakymas: {
    "id": 11,
    "name": "Kauno",
    "description": "Atsakymo pavyzdys",
    "creationDate": "2022-12-15T17:01:52.115149"
}
/api/ warehouses/{id} DELETE Remove
Panaikina sandėlio objektą iš sąrašo, pagal nurodytą ID
Papildoma informacija:
	Atsakymo formatas – 204 kodas
	Reikalinga autentifikacija – taip
	Metodo parametrai – id
Pavyzdys: DELETE http://localhost:5082/api/warehouses/1
Atsakymas:  

Antrasis sistemos objektas – items, bei jo metodų aprašymas.
/api/ warehouses/{warehouseId}/items GET List
Grąžina daiktų sąrašą konkrečiame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – ne
	Metodo parametrai – sandėlio id
Pavyzdys: GET http://localhost:5082/api/warehouses/12/items/
Atsakymas: [
    {
        "id": 15,
        "name": "DJI",
        "description": "Neblogas",
        "price": 50,
        "creationDate": "2022-12-16T10:04:38.323108",
        "term": 50
    }
]
/api/ warehouses/{warehouseId}/items/{itemId} GET One
Grąžina vieną konkretų daiktą nurodytame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – ne
	Metodo parametrai – sandėlio id, daikto id
Pavyzdys: GET http://localhost:5082/api/warehouses/12/items/15
Atsakymas: {
    "id": 15,
    "name": "DJI",
    "description": "Neblogas",
    "price": 50,
    "creationDate": "2022-12-16T10:04:38.323108",
    "term": 50
}
/api/ warehouses/{warehouseId}/items POST Create
Sukuria daikto objektą konkrečiame sandėlyje
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – name, description, price, term
Pavyzdys: POST http://localhost:5082/api/warehouses/11/items
Atsakymas: {
    "id": 19,
    "name": "DJI Mavic 3",
    "description": "Profesionalams",
    "price": 54.5,
    "creationDate": "2022-12-16T13:24:24.2896658Z",
    "term": 5
}
/api/ warehouses/{warehouseId}/items/{itemId} PUT/PATCH Modify
Redaguoja konkretų daiktą konkrečiame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – description
Pavyzdys: http://localhost:5082/api/warehouses/18/items/19
Atsakymas: {
    "id": 19,
    "name": "DJI Mavic 3",
    "description": "Redaguota ataskaitai",
    "price": 54.5,
    "creationDate": "2022-12-16T13:24:24.289665",
    "term": 5
}
/api/ warehouses/{warehouseId}/items/{itemId} DELETE Remove
Panaikina konkretų daikto objektą iš nurodyto sandėlio.
Papildoma informacija:
	Atsakymo formatas – 204 kodas
	Reikalinga autentifikacija – taip
	Metodo parametrai – sandėlio id, daikto id
Pavyzdys: DELETE http://localhost:5082/api/warehouses/18/items/19
Atsakymas:  
Trečiasis objektas sistemoje – komentarai, bei jo metodų aprašymas.
/api/ warehouses/{warehouseId}/items/{itemId}/comments GET List
Grąžina komentarų sąrašą apie konkretų daiktą konkrečiame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – ne
	Metodo parametrai – sandėlio id, daikto id
Pavyzdys: GET http://localhost:5082/api/warehouses/12/items/15/comments
Atsakymas: [
    {
        "id": 12,
        "name": "Nedas",
        "description": "Testas",
        "creationDate": "2022-12-16T14:07:24.498036"
    },
    {
        "id": 13,
        "name": "Nedas",
        "description": "Ataskaitai",
        "creationDate": "2022-12-16T14:07:29.315741"
    },
    {
        "id": 14,
        "name": "Nedas",
        "description": "Ataskaitai testas",
        "creationDate": "2022-12-16T14:07:34.517588"
    }
]
/api/ warehouses/{warehouseId}/items/{itemId}/comments/{commentId} GET One
Grąžina vieną konkretų komentarą apie konkretų daiktą konkrečiame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – ne
	Metodo parametrai – sandėlio id, daikto id, komentaro id
Pavyzdys: GET http://localhost:5082/api/warehouses/12/items/15/comments/14
Atsakymas: {
    "id": 14,
    "name": "Nedas",
    "description": "Ataskaitai testas",
    "creationDate": "2022-12-16T14:07:34.517588"
}
/api/ warehouses/{warehouseId}/items/{itemId}/comments POST Create
Sukuria naują komentarą apie konkretų daiktą konkrečiame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – sandėlio id, daikto id, komentaro id, name, description
Pavyzdys: POST http://localhost:5082/api/warehouses/12/items/15/comments
Atsakymas: {
    "id": 15,
    "name": "Nedas",
    "description": "Naujas komentaras ataskaitai",
    "creationDate": "2022-12-16T14:10:55.1707803Z"
}
/api/ warehouses/{warehouseId}/items/{itemId}/comments/{commentId} PUT/PATCH Modify
Redaguoja pasirinktą komentarą apie pasirinktą daiktą pasirinktame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – json
	Reikalinga autentifikacija – taip
	Metodo parametrai – sandėlio id, daikto id, komentaro id, description
Pavyzdys: PUT http://localhost:5082/api/warehouses/12/items/15/comments/14
Atsakymas: {
    "id": 14,
    "name": "Nedas",
    "description": "Redaguota",
    "creationDate": "2022-12-16T14:07:34.517588"
}
/api/v1/warehouses/{warehouseId}/items/{itemId}/comments/{commentId} DELETE Remove
Ištrina pasirinktą komentarą apie pasirinktą daiktą pasirinktame sandėlyje.
Papildoma informacija:
	Atsakymo formatas – 204 kodas
	Reikalinga autentifikacija – taip
	Metodo parametrai – sandėlio id, daikto id, komentaro id
Pavyzdys: DELETE http://localhost:5082/api/warehouses/12/items/15/comments/14
Atsakymas:  

Projekto išvados
Apibendrindamas darbą galiu teigti, jog dalinai pavyko įgyvendinti pirminę projekto idėją. Pradinė idėja buvo realizuoti nuomos sistema, tačiau projekto eigoje susidūrus su sunkumais pakeičiau sistemos paskirtį į dronų sandėliavimo informacinę sistemą. Darydamas šį darbą įgijau labai daug naujų žinių. Susipažinau su saityno taikomųjų programų kūrimo būdais.

