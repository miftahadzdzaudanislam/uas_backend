// import AlumniController

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni

// export router
module.exports = router;
