import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import FileUpload from "express-fileupload";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AdministatrosRoute from "./routes/AdministatrosRoute.js";
import HalamanStatisRoute from "./routes/HalamanStatisRoute.js";
import TamplatesRoute from "./routes/TamplatesRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import AgendaRoute from "./routes/AgendaRoute.js";
import AlbumRoute from "./routes/AlbumRoute.js";
import BackgroundRoute from "./routes/BackgroundRoute.js";
import BannerRoute from "./routes/BannerRoute.js";
import DownloadRoute from "./routes/DownloadRoute.js";
import HeaderRoute from "./routes/HeaderRoute.js";
import HubungiRoute from "./routes/HubungiRoute.js";
import IdentitasRoute from "./routes/IdentitasRoute.js";
import IklanAtasRoute from "./routes/IklanAtasRoute.js";
import IklanTengahRoute from "./routes/IklanTengahRoute.js";
import KataJelekRoute from "./routes/KataJelekRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import LinkTerkaitRoute from "./routes/LinkTerkaitRoute.js";
import LogoRoute from "./routes/LogoRoute.js";
import ModulRoute from "./routes/ModulRoute.js";
import ModAlamatRoute from "./routes/ModAlamatRoute.js";
import ModYmRoute from "./routes/ModYmRoute.js";
import PasangIklanRoute from "./routes/PasangIklanRoute.js";
import PengumumanRoute from "./routes/PengumumanRoute.js";
import PlaylistRoute from "./routes/PlaylistRoute.js";
import PollingRoute from "./routes/PollingRoute.js";
import cookieParser from "cookie-parser";
dotenv.config(); // Memuat variabel lingkungan dari file .env

const app = express(); // Membuat aplikasi Express

const sessionStore = SequelizeStore(session.Store); // Mengonfigurasi session store untuk Sequelize

const store = new sessionStore({
  db: db, // Menghubungkan session store dengan database
});
// Jangan lupa kalo ga dipake dikasih komentar, ini buat bikin tabel
(async () => {
  await db.sync();
})(); 

app.use(
  session({
    secret: process.env.SESS_SECRET, // Kunci rahasia untuk enkripsi sesi
    resave: false, // Tidak menyimpan ulang sesi yang tidak berubah
    saveUninitialized: true, // Menyimpan sesi baru yang belum diinisialisasi
    store: store, // Menyimpan sesi di database menggunakan Sequelize store
    cookie: {
      secure: "auto", // Mengatur cookie agar hanya dikirim melalui HTTPS (otomatis tergantung pada lingkungan)
    },
  })
);

// Konfigurasi middleware CORS
app.use(
  cors({
    credentials: true, // Mengizinkan pengiriman kredensial seperti cookie
    origin: "http://localhost:3000", // Mengizinkan akses hanya dari origin ini
  })
);

app.use(express.json()); // Middleware untuk parsing JSON
app.use(FileUpload()); // Middleware untuk menangani upload file
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("public/images/user"));

// Kumpulan route berdasarkan abjad
app.use(AdministatrosRoute);
app.use(TamplatesRoute);
app.use(AgendaRoute);
app.use(AlbumRoute);
app.use(BackgroundRoute);
app.use(BannerRoute);
app.use(CommentRoute);
app.use(DownloadRoute); 
app.use(HalamanStatisRoute);
app.use(HeaderRoute);
app.use(HubungiRoute);
app.use(IdentitasRoute);
app.use(IklanAtasRoute);
app.use(IklanTengahRoute);
app.use(KataJelekRoute);
app.use(KategoriRoute);
app.use(LinkTerkaitRoute);
app.use(LogoRoute);
app.use(ModulRoute);
app.use(ModAlamatRoute);
app.use(ModYmRoute);
app.use(PasangIklanRoute);
app.use(PengumumanRoute);
app.use(PlaylistRoute);
app.use(PollingRoute);
app.use(UserRoute);
//store.sync(); // Menyinkronkan tabel session dengan database

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and Running...."); // Menjalankan server pada port yang ditentukan
});