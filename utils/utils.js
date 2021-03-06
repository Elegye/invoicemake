var faker = require('faker/locale/fr')
var fs = require('fs')
const jsdom = require("jsdom")
const { JSDOM } = jsdom;
const postcssJs = require("postcss-js");
const postcss = require("postcss");

function set_styles(dom){
    var buffer = [];
    dom.window.document.querySelectorAll("style").forEach((style, i) => {
      const root = postcss.parse(style.textContent);
      buffer.push((postcssJs.objectify(root)));
    });

    dom.window.document.querySelectorAll("p").forEach((el, i) => {
      const root = postcss.parse(el.getAttribute("style") == null ? "" : el.getAttribute("style"));
      let className = "";
      if(el.getAttribute("class") != undefined){
        className = new String("."+el.getAttribute("class"));
      }
      else if (el.getAttribute("id") != undefined) {
        className = new String("#"+el.getAttribute("id"));
      }{
        className = undefined;
      }
      if(className != undefined){
        buffer.push({[className]:postcssJs.objectify(root)})
      }
    });

    dom.window.document.querySelectorAll("div").forEach((el, i) => {
      const root = postcss.parse(el.getAttribute("style") == null ? "" : el.getAttribute("style"));
      let className = "";
      if(el.getAttribute("class") != undefined){
        className = new String("."+el.getAttribute("class"));
      }
      else if (el.getAttribute("id") != undefined) {
        className = new String("#"+el.getAttribute("id"));
      }{
        className = undefined;
      }
      if(className != undefined){
        buffer.push({[className]:postcssJs.objectify(root)})
      }
    });

    return dom, buffer;
}

function set_images(dom){
    var images = dom.window.document.querySelectorAll("img");
    images.forEach((image, i) => {
      let src = image.getAttribute("src");
      image.setAttribute("src", "data:image/png;base64,"+fs.readFileSync(src, "base64"));
    });

    return dom;
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max-1)) + 1;
}

const client_name = () => {
  return faker.name.prefix() + " " + faker.name.firstName() + " " + faker.name.lastName();
}
const client_address = () => {
  return faker.address.streetAddress();
}

const invoice_due_date = () => {
  const d = faker.date.soon();
  return [d.getDate(), d.getMonth()+1, d.getFullYear()].map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}

const invoice_edition_date = () => {
  const d = faker.date.recent();
  return [d.getDate(), d.getMonth()+1, d.getFullYear()].map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}

const invoice_number = () => {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return getRandomInt(9999999) + letters.charAt(getRandomInt(letters.length));
}

const car_desc = () => {
  return faker.vehicle.vehicle();
}

const car_immat = () => {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";
  var immat = "";
  for( var i=0; i < 2; i++ ) {
    immat += letters.charAt(getRandomInt(letters.length));
  }
  for( var i=0; i < 3; i++ ) {
    immat += numbers.charAt(getRandomInt(numbers.length));
  }
  for( var i=0; i < 2; i++ ) {
    immat += letters.charAt(getRandomInt(letters.length));
  }
  // Génère aléatoirement une plaque avec des tirets, tout attaché ou sans tiret.
  var choice = getRandomInt(3);
  switch(choice){
    case 1: // == Tirets
    immat = immat.slice(0,2)+"-"+immat.slice(2, 5)+"-"+immat.slice(5);
    break;
    case 2: // == Tout attaché
    break;
    case 3: // == Sans tiret (avec espace)
    immat = immat.slice(0,2)+" "+immat.slice(2, 5)+" "+immat.slice(5);
    break;
  }
  return immat;
}

const item_ref = () => {
  return faker.random.word();
}

const item_label = () => {
  return faker.random.words();
}

function generate_item() {
  let quantity = getRandomInt(5);
  let puht = getRandomInt(250);
  return {
    ref: item_ref(),
    label: item_label(),
    qte: quantity,
    puht: puht,
    ptht: quantity*puht
  }
}

const set_item = (dom, number_items) => {
  var items = [];
  let total = 0;
  items.push(generate_item())
  var node_replicate = dom.window.document.querySelector("tbody.items").outerHTML;

  for(i=1; i<number_items; i++){
    dom.window.document.querySelector('tbody.items').insertAdjacentHTML("beforeend", node_replicate);
    items.push(generate_item());
  }

  items.forEach((item, i) => {
    total += item.ptht;
  });


  dom.window.document.querySelectorAll("td.item_ref").forEach((el, index) => {
    el.textContent = items[index].ref;
  });
  dom.window.document.querySelectorAll("td.item_label").forEach((el, index) => {
    el.textContent = items[index].label;
  });
  dom.window.document.querySelectorAll("td.item_qte").forEach((el, index) => {
    el.textContent = items[index].qte;
  });
  dom.window.document.querySelectorAll("td.item_puht").forEach((el, index) => {
    el.textContent = items[index].puht;
  });
  dom.window.document.querySelectorAll("td.item_ptht").forEach((el, index) => {
    el.textContent = items[index].ptht;
  });
  return {
    html: dom,
    invoice: {
      items: items,
      total: total
      }
    };
}

exports.set_data = function set_data(content, number_items){
  var dom = new JSDOM(content);
  var style = [];
  var immat, due_date, edition_date, desc;
  var node = {};
  let items = [];

  dom, style = set_styles(dom);
  dom = set_images(dom);

  if(dom.window.document.querySelectorAll("tbody.items").length != 0){
    var number_items = getRandomInt(25);
    console.info(`Generating ${number_items} items ...`)
    Object.assign(node, set_item(dom, number_items));
    console.info(`Generating items DONE`);
  }
  else{
    console.error("Aucune ligne d'opération disponible");
  }

  if(dom.window.document.querySelectorAll("#car_immat").length != 0){
    immat = car_immat();
    dom.window.document.querySelector("#car_immat").textContent = immat;
    Object.assign(node.invoice, {car:{immat: immat}})
  }
  else{
    console.error("Aucune Immatriculation disponible");
  }

  if(dom.window.document.querySelectorAll("#invoice_due_date").length != 0){
    due_date = invoice_due_date();
    dom.window.document.querySelector("#invoice_due_date").textContent = due_date;
  }
  else{
    console.error("Aucune date de facturation disponible");
  }

  if(dom.window.document.querySelectorAll("#invoice_edition_date").length != 0){
    edition_date = invoice_edition_date();
    dom.window.document.querySelector("#invoice_edition_date").textContent = edition_date;
  }
  else{
    console.error("Aucune date d'édition disponible");
  }

  if(dom.window.document.querySelectorAll("#car_desc").length != 0){
    desc = car_desc()
    dom.window.document.querySelector("#car_desc").textContent = desc;
  }
  else{
    console.error("Aucune description véhicule disponible");
  }

  if(dom.window.document.querySelectorAll("#invoice_total_ht").length != 0){
    dom.window.document.querySelector("#invoice_total_ht").textContent = node.invoice.total;
  }
  else{
    console.error("Aucun total facture disponible");
  }

  if(dom.window.document.querySelectorAll("#invoice_total_ttc").length != 0){
    dom.window.document.querySelector("#invoice_total_ttc").textContent = (node.invoice.total*1.2).toFixed(2).toString();
  }
  else{
    console.error("Aucun total TTC facture disponible");
  }

  if(dom.window.document.querySelectorAll("#invoice_total_tva").length != 0){
    dom.window.document.querySelector("#invoice_total_tva").textContent = ((node.invoice.total*1.2)-node.invoice.total).toFixed(2);
  }
  else{
    console.error("Aucun total TVA facture disponible");
  }

  if(dom.window.document.querySelectorAll("#client_name").length != 0){
    var client_name_value = client_name();
    dom.window.document.querySelector("#client_name").textContent = client_name_value;
  }
  else{
    console.error("Aucun nom client disponible");
  }

  if(dom.window.document.querySelectorAll("#client_address").length != 0){
    var client_address_value = client_address();
    dom.window.document.querySelector("#client_address").textContent = client_address_value;
  }
  else{
    console.error("Aucune adresse client disponible");
  }

  if(dom.window.document.querySelectorAll("#numeroFacture").length != 0){
    var invoice_number_value = invoice_number();
    dom.window.document.querySelector("#numeroFacture").textContent = invoice_number_value;
  }
  else{
    console.error("Aucun numéro de facture disponible");
  }

  return {
    html: dom.serialize(),
    style: style,
    invoice:{
      number: invoice_number_value,
      items: node.invoice.items,
      due_date: due_date,
      edition_date: edition_date,
      client:{
        name: client_name_value,
        address: client_address_value
      },
      total_ht: node.invoice.total,
      total_ttc: parseFloat((node.invoice.total*1.2).toFixed(2)),
      car:{
        immat: immat,
        desc: desc,
      }
    }
  };
}
