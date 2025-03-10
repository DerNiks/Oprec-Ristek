const express = require("express");
const { getAllTryouts, createTryout, addQuestion, updateQuestion, deleteQuestion, getFilteredTryouts, submitTryout } = require("../controllers/tryoutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tryout
 *   description: API untuk mengelola Tryout
 */

/**
 * @swagger
 * /api/tryouts:
 *   get:
 *     summary: Mendapatkan semua tryout
 *     tags: [Tryout]
 *     responses:
 *       200:
 *         description: Daftar tryout berhasil didapatkan
 */
router.get("/", getAllTryouts);

/**
 * @swagger
 * /api/tryouts:
 *   post:
 *     summary: Membuat tryout baru
 *     tags: [Tryout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tryout berhasil dibuat
 *       400:
 *         description: Gagal membuat tryout
 */
router.post("/", authMiddleware, createTryout);

/**
 * @swagger
 * /api/tryouts/{id}/questions:
 *   post:
 *     summary: Menambahkan soal ke tryout
 *     tags: [Tryout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tryout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [truefalse, multiplechoice, shortanswer]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Soal berhasil ditambahkan
 */
router.post("/:id/questions", authMiddleware, addQuestion);

/**
 * @swagger
 * /api/tryouts/{id}/questions/{questionId}:
 *   put:
 *     summary: Mengupdate soal dalam tryout
 *     tags: [Tryout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tryout
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID soal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [truefalse, multiplechoice, shortanswer]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Soal berhasil diperbarui
 *       404:
 *         description: Soal tidak ditemukan
 */
router.put("/:id/questions/:questionId", authMiddleware, updateQuestion);

/**
 * @swagger
 * /api/tryouts/{id}/questions/{questionId}:
 *   delete:
 *     summary: Menghapus soal dalam tryout
 *     tags: [Tryout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tryout
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID soal
 *     responses:
 *       200:
 *         description: Soal berhasil dihapus
 *       404:
 *         description: Soal tidak ditemukan
 */
router.delete("/:id/questions/:questionId", authMiddleware, deleteQuestion);

/**
 * @swagger
 * /api/tryouts/filter:
 *   get:
 *     summary: Mendapatkan tryouts dengan filter
 *     tags: [Tryout]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Judul tryout
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Kategori tryout
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Tanggal mulai filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Tanggal akhir filter
 *     responses:
 *       200:
 *         description: Daftar tryout yang terfilter
 */
router.get("/filter", getFilteredTryouts);

/**
 * @swagger
 * /api/tryouts/{id}/submit:
 *   post:
 *     summary: Mengirim jawaban tryout
 *     tags: [Tryout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tryout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Jawaban berhasil disimpan
 */
router.post("/:id/submit", authMiddleware, submitTryout);

module.exports = router;
