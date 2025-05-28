const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products
router.get("/", async (req, res) => {
  try {
    const produk = await prisma.produk.findMany();
    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil produk." });
  }
});

// Add product
router.post("/", async (req, res) => {
  const { namaProduk, stok, hargaBeli, hargaJual } = req.body;
  try {
    const newProduk = await prisma.produk.create({
      data: { namaProduk, stok, hargaBeli, hargaJual },
    });
    res.json(newProduk);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah produk." });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { namaProduk, stok, hargaBeli, hargaJual } = req.body;
  try {
    const updated = await prisma.produk.update({
      where: { id: Number(id) },
      data: { namaProduk, stok, hargaBeli, hargaJual },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate produk." });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produk.delete({ where: { id: Number(id) } });
    res.json({ message: "Produk berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus produk." });
  }
});

// Kurangi stok produk
router.post("/kurangi-stok", async (req, res) => {
  const items = req.body; // Array of { id, jumlah }

  try {
    const updatePromises = items.map(async (item) => {
      const produk = await prisma.produk.findUnique({ where: { id: item.id } });

      if (!produk || produk.stok < item.jumlah) {
        throw new Error(`Stok tidak cukup untuk produk ID ${item.id}`);
      }

      return prisma.produk.update({
        where: { id: item.id },
        data: { stok: produk.stok - item.jumlah },
      });
    });

    await Promise.all(updatePromises);

    res.json({ message: "Stok berhasil dikurangi." });
  } catch (error) {
    console.error("Gagal mengurangi stok:", error);
    res.status(500).json({ message: "Gagal mengurangi stok produk." });
  }
});


module.exports = router;
