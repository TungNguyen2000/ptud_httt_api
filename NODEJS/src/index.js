const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const route = require('./routes');
// Authentication Packages
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const port = 3000;
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//Add static folder
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//Template Engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  layoutsDir: __dirname + '/resources/views/layouts/',
  partialsDir: __dirname + '/resources/views/partials/',
  helpers: {
    formatCurrency(value) {
      return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    bodauTiengViet(str) {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/ /g, "-");
      // str = str.replace(/\W+/g, ' ');
      // str = str.replace(/\s/g, '-');
      return str;
    }
  }
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));

//Express Session
const sessionMiddleware = session({
  secret: 'ansckansclahicqwunak',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
})
app.use(sessionMiddleware);

//Use Passport
app.use(passport.initialize());
app.use(passport.session());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});

io.on('connection', (socket) => {
  // when the client emits 'add user', this listens and executes
  console.log(`new connection ${socket.id}`);
  socket.on('whoami', (cb) => {
    cb(socket.request.user ? socket.request.user.username : '');
  });

  const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  console.log(session.passport.user)
  session.socketId = socket.id;
  session.save();
});



//Route init
route(app);


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

