const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para la página inicial
app.get('/', async (req, res) => {
  try {
    // Realiza una solicitud a la API
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
    const cocktails = response.data.drinks.slice(0, 4); // Obtiene los primeros 4 elementos

    // Renderiza la página inicial con los datos de los cócteles
    res.render('index', { cocktails });
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener datos de la API', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para la página de detalle
app.get('/detail/:id', async (req, res) => {
  try {
    // Obtén el ID del cóctel desde los parámetros de la URL
    const { id } = req.params;

    // Realiza una solicitud a la API para obtener detalles del cóctel específico
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const cocktail = response.data.drinks[0];

    // Renderiza la página de detalle con los datos del cóctel
    res.render('detail', { cocktail });
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener detalles del cóctel', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});