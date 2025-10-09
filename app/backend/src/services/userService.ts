import { db } from "../config/db/index";

export const findUserByEmailOrMobile = async (emailOrMobile: string) => {
  const [rows]: any = await db.query(
    `SELECT u.*, r.name as role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = ? OR u.mobile = ?`,

    [emailOrMobile, emailOrMobile]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const findUserByEmailOrMobileExists = async (
  email: string,
  mobile: string
) => {
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE email = ? OR mobile = ?",
    [email, mobile]
  );
  return rows.length > 0 ? rows[0] : null;
};
export const createUser = async (
  name: string,
  email: string,
  mobile: string,
  hashedPassword: string,
  roleId: number,
  verifyBy: "email" | "mobile"
): Promise<number> => {
  const emailStatus = verifyBy === "email" ? 1 : 0; // pending if email
  const mobileStatus = verifyBy === "mobile" ? 1 : 0; // pending if mobile

  const [result]: any = await db.query(
    `INSERT INTO users (name, email, mobile, password, role_id, email_status, mobile_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, mobile, hashedPassword, roleId, emailStatus, mobileStatus]
  );

  return result.insertId;
};

export const getRoleIdByName = async (roleName: string) => {
  const [rows]: any = await db.query("SELECT id FROM roles WHERE name = ?", [
    roleName,
  ]);
  return rows.length > 0 ? rows[0].id : null;
};

export const updateLastLogin = async (userId: number) => {
  await db.query("UPDATE users SET last_login = NOW() WHERE id = ?", [userId]);
};
