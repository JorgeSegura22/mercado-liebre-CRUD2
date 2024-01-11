const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const leerArchivo=require("../data/dbLogica")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { v4: uuidv4 } = require('uuid');
const { param } = require('../app');
const controller = {
	// Root - Show all products
	index: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


			res.render('products', { products, toThousand });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const id = req.params.id;
    const product = products.find(product => product.id == id);

	console.log("esto hay en product" + product)

    res.render('detail', { product, toThousand,title:"Detalle" });
	
	},
	
// 
	
	// Create - Form to create
	create: (req, res) => {
      res.render("product-create-form")

	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		const files = req.files;
		
		const images = [];
		files.forEach(element => {
			images.push(element.filename);
		});
	
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	
		let { name, price, discount, category, description } = req.body;
	
		let datosDeProducto = {
			id: uuidv4(),
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
			image: files ? images : ["default.jpg"],
		};
	
		products.push(datosDeProducto);
	
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
	
		// Redirige al usuario a la página que prefieras
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const  {id}  = req.params

console.log(id)
let productToEdit=products.find(elemento=>elemento.id== +id)



		return res.render("product-edit-form",{productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		
		const files = req.files;
		
		const images = [];
		files.forEach(element => {
			images.push(element.filename);
		});
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { id } = req.params;
const { name, price, discount, category, description,image } = req.body;

const productToUpdate = products.find(elemento => elemento.id === +id);

if (productToUpdate) {
 
  productToUpdate.name = name.trim();
  productToUpdate.price = +price;
  productToUpdate.description = description.trim();
  productToUpdate.discount = +discount;
  productToUpdate.category = category;
  
	productToUpdate.image = files ? files.map(file => file.filename) : ["default.jpg"];
    



  
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

  

 
  return res.redirect("/");
}
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		

		const id = req.params.id;
		const productToDelete = products.filter(elemento => elemento.id !=+id);

		console.log(productToDelete)
		
		 
		  
		
		
		  
		  fs.writeFileSync(productsFilePath, JSON.stringify(productToDelete, null, 2), 'utf-8');

		 
		  res.redirect("/");
	}
};

module.exports = controller;

