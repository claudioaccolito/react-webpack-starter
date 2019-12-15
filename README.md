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
A seguito di una corretta configurazione permette di generare file ottimizzati utilizzabili direttamente su un web server interpretabili da un browser.\
In altre parole ci consente di configurare degli automatismi che semplificano la gestione dei sorgenti al fine di eseguire efficientemente il deploy di un'applicazione web.

Vedremo solo i concetti chiave per costruire le basi del nostro progetto, anche perché da ogni progetto le configurazioni di webpack evolvono diversamente a seconda delle esigenze (la documentazione è vasta e dettagliata).\

[scopri di più sul sito ufficiale](https://webpack.js.org/)

### 1. :bomb: Inizializzazione del progetto

Iniziamo creando un progetto React, dunque installiamo tutto ciò che serve

``` shell
npm install --save-dev @babel/preset-react
```

Per poter utilizzare la sintassi Javscript più moderba con React configuriamo Babel con il file .babelrc come il seguente

``` shell
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

Installiamo tutte le dipendenze necessarie all'applicazione.\
Per simulare lo sviluppo di un'app semicomplessa di esempio in questo caso aggiungiamo anche d3.js. Tuttavia non è una dipendenza necessaria.

``` shell
npm install --save react react-dom d3
```

Scarichiamo anche quelle utili per lo sviluppo

``` shell
npm i -D webpack webpack-cli webpack-dev-server babel-loader babel-loader css-loader file-loader less less-loader style-loader url-loader
```

Ora procediamo creando il file webpack.config.js come il seguente

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
        loader: "url-loader?limit=1024&name=images/[name].[ext]"
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

Ora andiamo a spiegare...
