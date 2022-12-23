require('./src/database/connection');

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.on('Connected to database', () => {
  app.listen(PORT, () => {
    console.log(`Development server running on port 3000`);
  });
});
