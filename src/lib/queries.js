import pool from './db';

export async function getAllVisitors() {
  const [rows] = await pool.query(`
    SELECT v.*, d.name AS department_name
    FROM visitors v
    JOIN departments d ON v.department_id = d.id
    ORDER BY v.visit_date DESC
    `);
  return rows;
}

export async function getDepartments() {
  const [rows] = await pool.query(`SELECT * FROM departments ORDER BY name`);
  return rows;
}

export async function addVisitor([visit_date, name, email, phone, whom_to_meet, department_id, has_appointment]) {
  const [result] = await pool.execute(`
    INSERT INTO visitors (visit_date, name, email, phone, whom_to_meet, department_id, has_appointment)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [visit_date, name, email, phone, whom_to_meet, department_id, has_appointment]);
  return result;
}

export async function updateVisitor(id, [visit_date, name, email, phone, whom_to_meet, department_id, has_appointment]) {
  const [result] = await pool.execute(`
    UPDATE visitors
    SET visit_date = ?, name = ?, email = ?, phone = ?, whom_to_meet = ?, department_id = ?, has_appointment = ?
    WHERE id = ?
  `, [visit_date, name, email, phone, whom_to_meet, department_id, has_appointment, id]);
  return result;
}

export async function deleteVisitor(id) {
  const [result] = await pool.execute(`DELETE FROM visitors WHERE id = ?`, [id]);
  return result;
}

