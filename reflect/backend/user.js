// user.js
import { pool } from "./db.js";
import bcrypt from "bcrypt";

// Create a new user
export async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10); // hash password
  const [result] = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, passwordHash]
  );
  console.log("Created user ID:", result.insertId);
  return result.insertId;
}

// Authenticate user
export async function authenticateUser(email, password) {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) return false; // no user found

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (match) {
    console.log("Authentication successful for user:", email);
    return user;
  } else {
    console.log("Authentication failed for user:", email);
    return false;
  }
}