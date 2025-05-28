const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get semua laporan transaksi
router.get("/", async (req, res) => {
  try {
    const laporan = await prisma.laporanTransaksi.findMany({
      orderBy: { tanggal: "desc" },
    });
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil laporan transaksi." });
  }
});

// Tambah laporan transaksi
router.post("/", async (req, res) => {
  const { tanggal, jenis, total, keterangan } = req.body;
  try {
    const laporanBaru = await prisma.laporanTransaksi.create({
      data: { tanggal, jenis, total, keterangan },
    });
    res.json(laporanBaru);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan laporan transaksi." });
  }
});

module.exports = router;
