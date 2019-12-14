# Creare un'applicazione react con webpack

 :muscle: 350 pt  
 :clock130: ~ 40 min

## Prepariamo l'ambiente di lavoro

Prima di iniziare si consiglia di seguire prima la pillola formativa riguardante NodeJS ed Express poiché in questo si considerano acquisite alcune nozioni riguardanti NodeJS.

Avremmo quindi bisogno di

* NodeJs installato (scaricabile [qui](https://nodejs.org/it/))
* Il nostro IDE (esempio [VS Code](https://code.visualstudio.com/))

## Webpack

Webpack è uno static module bundler per applicazioni Javascript.\
A seguito di una corretta configurazione permette di generare file utilizzabili direttamente su un web server interpretabili da un browser.\
In poche parole ci consente di configurare degli automatismi che semplificano la gestione dei sorgenti al fine di gestire efficientemente il deploy degli assets.

Per conoscere in modo completo non può bastare una pillola formativa, ci vorrebbe una farmacia!\
Vedremo quindi solo i concetti chiave per costruire le basi del nostro progetto, anche perché da ogni progetto le configurazioni di webpack evolvono diversamente a seconda delle esigenze (la documentazione è vasta e dettagliata).\

[scopri di più sul sito ufficiale](https://webpack.js.org/)

### 1. :bomb: Inizializzazione del progetto
