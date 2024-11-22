import { Book } from "./book.js";
import { BinaryTree } from "./tree.js";
import { generateISBN } from "./isbnGenerator.js";

// Crear instancia del árbol binario
const tree = new BinaryTree();

// Referencias a los elementos del DOM
const isbnInput = document.getElementById("isbn");
const titleInput = document.getElementById("title");
const addBookBtn = document.getElementById("addBook");
const generateIsbnBtn = document.getElementById("generateISBN");
const searchIsbnInput = document.getElementById("searchISBN");
const searchBookBtn = document.getElementById("buscarBtn");
const deleteBookBtn = document.getElementById("deleteBook");
const deleteIsbn = document.getElementById("deleteISBN");
const resultsList = document.getElementById("results");
const treeVisualization = document.getElementById("tree");

/**
 * Generar un ISBN y mostrarlo en el campo de entrada
 */
generateIsbnBtn.addEventListener("click", () => {
  const isbn = generateISBN();
  isbnInput.value = isbn;
  displayMessage(`ISBN generado: ${isbn}`);
});

/**
 * Agregar un libro al árbol binario
 */
addBookBtn.addEventListener("click", () => {
  const isbn = isbnInput.value.trim();
  const title = titleInput.value.trim();

  if (!isbn || !title) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  tree.insert(new Book(isbn, title));
  isbnInput.value = "";
  titleInput.value = "";
  renderCatalog();
  displayMessage(`Libro "${title}" agregado con ISBN: ${isbn}`);
});

/**
 * Buscar un libro por ISBN en el árbol binario
 */
searchBookBtn.addEventListener("click", () => {
  const isbn = searchIsbnInput.value.trim();
  if (!isbn) {
    alert("Por favor, introduce un ISBN para buscar.");
    return;
  }

  const book = tree.search(isbn);
  resultsList.innerHTML = book
    ? `<li>${book.title} (ISBN: ${book.isbn})</li>`
    : `<li>No se encontró el libro con ISBN: ${isbn}.</li>`;
});

/**
 * Eliminar un libro del árbol binario por ISBN
 */
deleteBookBtn.addEventListener("click", () => {
  const isbn = deleteIsbn.value.trim();
  if (!isbn) {
    alert("Por favor, introduce un ISBN para eliminar.");
    return;
  }

  const deletedBook = tree.delete(isbn);
  if (deletedBook) {
    renderCatalog();
    displayMessage(
      `Libro "${deletedBook.title}" con ISBN ${deletedBook.isbn} eliminado.`
    );
  } else {
    displayMessage(`No se encontró un libro con ISBN: ${isbn}.`);
  }
  searchIsbnInput.value = "";
});

/**
 * Renderizar el catálogo de libros ordenado
 */
function renderCatalog() {
  const books = tree.inorderTraversal(); // Obtener los libros en orden ascendente
  treeVisualization.innerHTML = books.length
    ? books
        .map(
          (book) => `
          <div>
            <h4>${book.title}</h4>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
          </div>`
        )
        .join("")
    : `<p style="margin: 0 auto">No hay libros en el catálogo.</p>`;
}

/**
 * Mostrar un mensaje en la sección de resultados
 * @param {string} message - Mensaje a mostrar
 */
function displayMessage(message) {
  resultsList.innerHTML = `<li>${message}</li>`;
}

// Inicializar con un renderizado vacío
renderCatalog();
