// import database
const { query } = require("express");
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  // buat fungsi static all
  static async all() {
    return new Promise((resolve, reject) => {
      // Query MySQL untuk melihat data alumni
      const query = "SELECT * FROM alumni";

      // Eksekusi query
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // buat fungsi static create
  static async crate(data) {
    const id = await new Promise((resolve, reject) => {
      // Query MySQL untuk menambah data
      const query = "INSERT INTO alumni SET ?";

      db.query(query, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // mencari data yang ditambah
    const alumni = this.find(id);
    return alumni;
  }

  // buat fungsi static find
  static async find(id) {
    return new Promise((resolve, reject) => {
      // Query MySQL untuk mencari id
      const query = "SELECT * FROM alumni WHERE id = ?";

      db.query(query, id, (err, results) => {
        const [alumni] = results;
        resolve(alumni);
      });
    });
  }

  // buat fungsi static update
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      // Query MySQL untuk mengupdate data
      const query = "UPDATE alumni SET ? WHERE id = ?";

      db.query(query, [data, id], (err, results) => {
        resolve(results.insertId);
      });
    });

    // Mencari data yang di update
    const alumni = await this.find(id);
    return alumni;
  }

  // buat fungsi static delete
  static async delete(id) {
    return new Promise((resolve, reject) => {
      // Query MySQL untuk mencari id
      const query = "DELETE FROM alumni WHERE id = ?";
      db.query(query, id, (err, results) => {
          resolve(results);
      });
    });
  }

  // buat fungsi static search
  static async search(name) {
    return new Promise((resolve, reject) => {
      // Query MySQL untuk mencari name
      const query = "SELECT * FROM alumni WHERE name LIKE ?";
      const searchValue = `%${name}%`;
      db.query(query, [searchValue], (err, results) => {
          resolve(results);
      });
  });
  }

  // buat fungsi static findByStatus
  static async findByStatus() {
    return new Promise((resolve, reject) => {
      // Query MySQL untuk mencari status
      const query = "SELECT * FROM alumni WHERE status = ?";
      db.query(query, (err, results) => {
          resolve(results);
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
