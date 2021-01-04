var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var fs = require('fs');
var utils = require('./utils/utils.js');
var util = require('util');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("html-to-pdfmake");

var numberDocument = process.argv[2] != undefined ? process.argv[2] : 10;
var templateName = process.argv[3] != undefined ? process.argv[3] : undefined;

if(!fs.existsSync("./pdfs")){
    fs.mkdirSync("./pdfs");
}
if(!fs.existsSync("./pdfs/json")){
    fs.mkdirSync("./pdfs/json");
}

const createPdf = (templateName, numberDocument) => {
  var content = fs.readFileSync('templates/'+templateName, {encoding:'utf8'});
  for(i=0; i <= numberDocument; i++){
    completed_template = utils.set_data(content);
    var html = htmlToPdfMake(completed_template.html, {window: window});
    var style = completed_template.style; //require("./templates/styles/"+templateName+".js").styles
    var docDefinition = {
      content: [
        html
      ],
      styles:{
        style
      }
    };

    var pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBuffer(function(buffer) {
      fs.writeFileSync('pdfs/'+templateName+"_"+(i-1)+'_items.pdf', buffer);
      fs.writeFileSync('pdfs/json/'+templateName+"_"+(i-1)+'_items.json', JSON.stringify(completed_template.invoice, null, 4));
    })
  }
}

if(templateName == undefined){
  fs.readdirSync("./templates").forEach(file => {
    console.log("Création à partir du fichier : ", file);
    createPdf(file, numberDocument);
    console.log(file, numberDocument + " DONE");
  });
}

if(templateName != undefined){
  createPdf(templateName, numberDocument);
}
