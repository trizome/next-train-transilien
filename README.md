# next-train-transilien

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Todo: NEXT-TRAIN-TRANSILIEN permet d'obtenir les horaires des prochains train SNCF Transilien en fonction d'une gare de depart et d'une gare d'arrivée.


## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'next-train-transilien',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `defaultURL`        | *Optional* url de www.horaires-de-trains.fr/ avec gare de départ et gare d'arrivé<br><br>**Type:** `string` <br>Default "https://www.horaires-de-trains.fr/prochains-departs-Stade_de_France_Saint_Denis-Chatelet_Les_Halles.html"
| `libDepart`        | *Optional* Nom de la gare de départ<br><br>**Type:** `string` <br>Default "Stade de France Saint-Denis"
| `libDirection`     | *Optional* Nom de la gare de destination<br><br>**Type:** `string` <br>Default "Châtelet les Halles"
