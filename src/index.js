const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride=require('method-override')

const SortMiddleware =require('./app/middlewares/SortMiddleware')
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')
db.connect();
app.use(express.static(path.join(__dirname, '/public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//HTTP logger
app.use(morgan('combined'));
app.use(methodOverride('_method'))
app.use(SortMiddleware)

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers:{
            sum: (a,b)=>a+b,
            sortable:(field,sort)=>{
        const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'bi bi-funnel',
                asc:'bi bi-sort-down-alt',
                desc:'bi bi-sort-down',
            }
            const types = {
                default: 'desc',
                asc:'desc',
                desc:'asc',
            }


            const icon = icons[sortType]
            const type = types[sortType]
            return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`
            }
            }
        
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources','views'));

//route
route(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

