import mysql2 from "mysql2/promise";

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// (async () => {
//   console.log("🔍 Testing MySQL connection...", process.env.DB_HOST);

//   try {
//     const connection = await db.getConnection();
//     console.log("✅ MySQL connected successfully");
//     connection.release(); // release back to pool
//   } catch (error) {
//     console.error("❌ MySQL connection failed:", error);
//   }
// })();
