# Installation

Installer Node.js (version 12 de préférence)\n
Puis cloner le dépôt et exécuter `npm install` pour installer les dépendances

Pour créer un fichier : `node html_maker.js [nombre de fichiers souhaité] [nom du template]`

Par exemple : `node html_maker.js 5 halope.html` créera 5 fichiers différents correspondant au format Halopé.

# Créer un template
Il suffit de créer un fichier html avec la structure suivante:
```html
<div style="width: 100%; height: 100%;" class="body">
  <h2>Garage Halopé</h2>
  <h5>ZAC La Massonnière</h5>
  <h5>72230 Moncé-en-Belin</h5>
  <span>Immatriculation: <span id="car_immat"></span> | Description : <span id="car_desc"></span></span>
  <span>Date de la facture : <span id="invoice_edition_date"></span></span>
  <span>Dû le : <span id="invoice_due_date"></span></span>
  <table>
    <thead>
      <th style="width:60px" class="col_ref">Référence</th>
      <th style="width:150px" class="col_label">Désignation</th>
      <th style="width:150px" class="col_qte">Quantité</th>
      <th style="width:90px" class="col_puht">PU HT</th>
      <th style="width:90px" class="col_ptht">Prix Total HT</th>
    </thead>
    <tbody class="items">
      <tr class="item">
        <td style="text-align:center" height="50" class="item_ref">Réf</td>
        <td style="text-align:center" class="item_label">Label</td>
        <td class="item_qte">Ma quantité</td>
        <td class="item_puht">PUHT</td>
        <td class="item_ptht">PTHT</td>
      </tr>
    </tbody>
  </table>
  <table style="float: right" class="tablePrix">
    <tr>
      <th>Total HT</th>
      <td id="invoice_total_ht"></td>
      <th>Total TTC</th>
      <td id="invoice_total_ttc"></td>
    </tr>
  </table>
</div>
```
_Attention, pour qu'un style soit pris en compte il faut obligatoirement y associer un id ou un nom de classe_

En utilisant les id (uniques) et noms de classes (plusieurs entités), le générateur va le remplacer par des valeurs fictives.
