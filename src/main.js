import web from "./app/web.js";
const {PORT} = process.env;


web.listen(PORT, () => {
    console.log(`\n> server running on http://localhost:${PORT}`);
});