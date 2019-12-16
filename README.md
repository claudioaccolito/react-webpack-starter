# Creare un'applicazione react con webpack

 :muscle: 400 pt  
 :clock130: ~ 40 min

## Prepariamo l'ambiente di lavoro

Prima di iniziare si consiglia di seguire prima la pillola formativa riguardante NodeJS ed Express poiché in questo si considerano acquisite alcune nozioni riguardanti NodeJS.

Avremmo quindi bisogno di

* NodeJs installato (scaricabile [qui](https://nodejs.org/it/))
* Nozioni base riguardo Node JS
* Nozioni base riguardo React
* Il nostro IDE (esempio [VS Code](https://code.visualstudio.com/))

## Webpack

Webpack è uno static module bundler per applicazioni Javascript.\
A seguito di una corretta configurazione permette di generare file ottimizzati utilizzabili direttamente su un web server interpretabili da un browser.\
In altre parole ci consente di configurare degli automatismi che semplificano la gestione dei sorgenti al fine di eseguire efficientemente il deploy di un'applicazione web.

Vedremo solo i concetti chiave per costruire le basi del nostro progetto, anche perché da ogni progetto le configurazioni di webpack evolvono diversamente a seconda delle esigenze (la documentazione è vasta e dettagliata).

[scopri di più sul sito ufficiale](https://webpack.js.org/)

### 1. :handbag: Inizializzazione del progetto

Simuleremo lo sviluppo di un'app React semicomplessa di esempio, notare però che l'implementazione è solo a titolo di esempio, quello che importa in questo momento è la configurazione di Webpack.\
La nostra app di esempio è rappresentata da un SVG di una linea metropolitana con l'icona del treno che si muove al click di ciascun punto:

![line](./src/img/line.gif)

Procediamo dunque installando tutto ciò che serve per React

``` shell
npm install --save-dev @babel/preset-react
```

Per poter utilizzare la sintassi Javscript più moderna con React configuriamo Babel con il file .babelrc come il seguente

``` shell
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

Installiamo tutte le dipendenze necessarie all'applicazione.\
In questo caso di esempio aggiungiamo anche la libreria d3.js perché utile a questa implementazione, tuttavia non è una dipendenza necessaria in altri progetti.

``` shell
npm install --save react react-dom d3
```

Scarichiamo tutte quelle utili per l'ambiente di sviluppo

``` shell
npm i -D webpack webpack-cli webpack-dev-server babel-loader babel-loader css-loader file-loader less less-loader style-loader url-loader
```

### 2. :bomb: Configurazioni Webpack

Ora creiamo il file *webpack.config.js* come il seguente all'interno della route del progetto

``` javascript
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=1024&name=img/[name].[ext]"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
```

Con questa configurazione stiamo definendo delle regole per poter interpretare i file con estensione `js/jsx`, file `less` per lo stile grafico e per le immagini. Ciascuna estensione di file è quindi associata alla apposita libreria che abbiamo installato precedentemente (*babel-loader*, *less-loader*, *css-loader*, *url-loader* ecc.).

Nella proprietà `entry` stiamo dicendo che la nostra logica implementativa inizia nel file index.js, infatti in esso è presente il mounting del nostro componente "contenitore".

``` javascript
ReactDOM.render(
  <Home/>,
  document.getElementById('app')
);
```

Il tutto può funzionare solo definendo l'output in cui si trova il nostro file *index.html*. In questo caso nella cartella `/dist`.

``` javascript
output: {
  path: __dirname + '/dist',
  publicPath: '/',
  filename: 'bundle.js'
},
devServer: {
  contentBase: './dist',
  hot: true
}
```

All'interno del file index.html deve essere presente l'import del file `bundle.js`. Questo sarà il file prodotto da webpack "al volo" e aggiornato ogni volta che salviamo le nostre modifiche ai sorgenti, grazie alla proprietà `hot` presente nell'oggetto `devServer`.

Quindi il nostro file `/dist/index.html` sarà fatto in questo modo:

``` html
<!DOCTYPE html>
<html>
  <head>
    <title>React + Webpack</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

### 3. :art: Configurazioni package.json

Ci siamo quasi, quello che serve ora è modificare il `package.json` aggiungendo il seguente script per lanciare la web app.

``` json
"scripts": {
  "start": "webpack-dev-server --colors --port 3210 --open --config ./webpack.config.js --mode development"
}
```

In questo modo possiamo lanciare da linea di comando `npm start` per poter visualizzare la pagina html prodotta all'indirizzo [http://localhost:3210/](http://localhost:3210/).

Notare che come output sul terminale avremo tutte le informazioni relative alla compilazione comprese le dimensioni dei file prodotti.

### 4. :balloon: Configurazioni Webpack per il deploy

Proseguiamo adesso nelle configurazioni per ottenere degli assets minificati e ottimizzati al fine di avere tutto ciò che serve per caricare su un server una pagina web performante.

Aggiungiamo quindi questi 2 scripts al package.json

``` json
"build": "webpack --config ./webpack.config.js --mode production",
"server": "node ./server.js"
```

E installiamo Express per simulare un web server sulla nostra macchina

``` json
npm i -D express
```

Procediamo creando il nostro file `server.js`

``` javascript
var express = require('express');
var path = require('path');

const app = express(),
  DIST_DIR = path.join(__dirname + '/dist/'),
  HTML_FILE = path.join(DIST_DIR + '/dist/', 'index.html');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => { res.sendFile(HTML_FILE) });

app.listen(4321, function () {
  console.log('Example app listening on http://localhost:4321/');
});
```

Ora è tutto pronto. Possiamo buildare per la prima volta la nostra applicazione eseguendo il comando

``` shell
npm run build
```

Dopo di che, per vedere il risultato su un browser, lanciamo

``` shell
npm run server
```

Notare che il file `bundle.js`, prodotto nella cartella `dist`, è stato minificato ovvero non contiene spazi al fine di ridurre le dimensioni del file. In questo modo si riduce la latenza del caricamento della pagina (bundle.js ora è circa 200kb). Stiamo quindi lavorando per garantire una migliore *user experience* :sparkles:

Questa minificazione è avvenuta grazie alla configurazione all'interno dello script di build (--mode production).

Chiaramente in questo mini progetto le latenze sono irrisorie, ma su un progetto reale le ottimizzazioni di webpack consentono di migliorare notevolmente le performance.

Su sito di Webpack è presente usa [sezione](https://webpack.js.org/configuration/optimization/) interamente dedicata alle ottimizzazioni.

### 5. :boom: Ultime configurazioni utili

Installiamo questi due plugin di webpack

``` shell
npm i -D clean-webpack-plugin html-webpack-plugin
```

Creiamo il `file index.html` all'interno della cartella `src` come questo per definire un file di template

``` html
<!DOCTYPE html>
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div>
      <div id="app">
    </div>
  </body>
</html>
```

 Ora aggiungiamo le configurazioni al file webpack.config.js

``` javascript
plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'Webpaaaaaaack',
    template: './src/index.html'
  })
]
```

**Cosa abbiamo fatto??**

* `CleanWebpackPlugin` ci serve per ripulire la cartella *dist* ogni volta che eseguiamo il comando di build. Così da avere sempre l'ultima versione buildata sostituendo la precedente.
* `HtmlWebpackPlugin` ci serve invece per creare ogni volta un file html basandosi sul template presente in *src/index.hmtl*, dato che quello in dist verrà ogni volta eliminato. Notare inoltre come con la sintassi presente sopra è possibile passare dei parametri come il titolo da inserire nel tab della pagina.

In questo momento abbiamo lo stesso file *webpack.config.js* per gestire la compilazione sia in sviluppo sia in produzione, per cui anche eseguendo `npm start` verrà ripulita la cartella dist, il modo migliore di procedere sarebbe in realtà separare le configurazioni di *dev* da quelle di *production*.\
Si rimanda alla relativa [sezione](https://webpack.js.org/guides/production/) per completare al meglio le configurazioni richieste per la specifica applicazione.
