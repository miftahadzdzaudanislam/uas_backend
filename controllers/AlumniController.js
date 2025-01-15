// import Model Alumni
const Alumni = require("../models/Alumni.js");

// buat class AlumniController
class AlumniController {
  // buat fungsi untuk melihat data alumni
  async index(req, res) {
    // Memanggil method static all
    const alumni = await Alumni.all();

    if (alumni.length > 0) {
      const data = {
        message: "Menampilkan semua data Alumni",
        data: alumni
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Alumni belum ada",
      };

      res.status(200).json(data);
    }
  }

  // buat fungsi untuk menambah data
  async store(req, res) {
    // menambah data alumni
    const {name, phone, address, graduation_year, status} = req.body;

    if (!name) {
      const data = {
        message: "Data nama harus di isi."
      };
      res.status(422).json(data);
    } else if (!phone) {
      const data = {
        message: "Data nomor telephone harus di isi."
      };
      res.status(422).json(data);
    } else if (!address) {
      const data = {
        message: "Data alamat harus di isi."
      };
      res.status(422).json(data);
    } else if (!graduation_year) {
      const data = {
        message: "Data tahun lulus harus di isi."
      };
      res.status(422).json(data);
    } else if (!status) {
      const data = {
        message: "Data status harus di isi."
      };
      res.status(422).json(data);
    } else {
      // Menambah data
      const alumni = await Alumni.crate(req.body);
      const data = {
        message: "Menambah data alumni:",
        data: alumni
      };
      res.status(201).json(data);
    }
  }

  // buat fungsi untuk mengubah data
  async update(req, res) {
    const {id} = req.params;

    // Mencari id alumni yang di update
    const alumni = await Alumni.find(id);

    if (alumni) {
      // Mengubah data
      const alumni = await Alumni.update(id, req.body);
      const data = {
        message: `Mengubah data alumni pada id ${id}`,
        data: alumni
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Alumni tidak ditemukan."
      };
      res.status(404).json(data);
    }
  }

  // buat fungsi untuk menghapus data
  async destroy(req, res) {
    const {id} = req.params;
    const alumni = await Alumni.find(id);
    
    if (alumni) {
        await Alumni.delete(id);
        const data = {
            message: `Menghapus alumni pada id ${id}`,
            data: alumni,
        };
        res.status(200).json(data);
    } else {
        const data = {
            message: "Alumni tidak ditemukan",
        };
        res.status(404).json(data);
    }
  }

  // buat fungsi untuk melihat data berdasarkan id
  async show(req, res) {
    const {id} = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
        const data = {
            message: `Melihat data alumni id ${id}`,
            data: alumni,
        };
        res.status(200).json(data);
    } else {
        const data = {
            message: "Alumni not found",
        };
        res.status(404).json(data);
    }
  }

  // buat fungsi untuk mencari nama
  async search(req, res) {
    const { name } = req.params;
    const alumni = await Alumni.search(name);

    if (alumni && alumni.length > 0) {
        res.status(200).json({
            message: `Hasil pencarian untuk nama ${name}`,
            data: alumni,
        });
    } else {
        res.status(404).json({ message: "Nama alumni tidak ditemukan" });
    }
  }

  // buat fungsi untuk mencari data status fresh Graduate
  async freshGraduate(req, res) {
    const alumni = await Alumni.findByStatus("freshGraduate");
    
    if (alumni && alumni.length > 0) {
        res.status(200).json({
            message: `Hasil pencarian untuk status Fresh Graduate`,
            data: alumni,
        });
    } else {
        res.status(404).json({ message: "Nama alumni tidak ditemukan" });
    }
  }

  // buat fungsi untuk mencari data status employed
  async employed(req, res) {
    const alumni = await Alumni.findByStatus("employed");
    
    if (alumni && alumni.length > 0) {
        res.status(200).json({
            message: `Hasil pencarian untuk status Employed`,
            data: alumni,
        });
    } else {
        res.status(404).json({ message: "Nama alumni tidak ditemukan" });
    }
  }

  // buat fungsi untuk mencari data status unemployed
  async unemployed(req, res) {
    const alumni = await Alumni.findByStatus("unemployed");
    
    if (alumni && alumni.length > 0) {
        res.status(200).json({
            message: `Hasil pencarian untuk status Unemployed`,
            data: alumni,
        });
    } else {
        res.status(404).json({ message: "Nama alumni tidak ditemukan" });
    }
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
