const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const watchRouter = require('./routes/watch');
const suggestRouter = require('./routes/suggests');

app.get('/', (req, res) => res.render('home'));
app.use('/search', searchRouter);
app.use('/watch', watchRouter);
app.use('/api/suggests', suggestRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
