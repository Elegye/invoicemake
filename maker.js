var fonts = {
	Roboto: {
		normal: 'assets/fonts/Roboto-Regular.ttf',
		bold: 'assets/fonts/Roboto-Medium.ttf',
		italics: 'assets/fonts/Roboto-Italic.ttf',
		bolditalics: 'assets/fonts/Roboto-MediumItalic.ttf'
	}
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

operationLines = [];

maxLines = getRandomInt(20);

for(i=0; i<maxLines; i++){
		operationLines.push(['LS932', 'Filtre à huile', '1', '2', '2']);
}
operationLines.unshift(['Référence', 'Désignation', 'Quantité', 'Prix Unit HT', 'Prix Total HT']);

var docDefinition = {
	content: [
		'Garage Halopé',
		'72230 Moncé-en-Belin',
		'Tél: 02.43.42.41.99',
	],
	content: [
		{
			style: 'tableExample',
			table: {
				body: operationLines
			}
		},
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableOpacityExample: {
			margin: [0, 5, 0, 15],
			fillColor: 'blue',
			fillOpacity: 0.3
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}
};

console.log(docDefinition.content[0].table.body)
var pdfDoc = printer.createPdfKitDocument(docDefinition);

pdfDoc.pipe(fs.createWriteStream('pdfs/invoice.pdf'));
pdfDoc.end();
