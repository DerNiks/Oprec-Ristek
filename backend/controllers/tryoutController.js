const Tryout = require("../models/Tryout");
const authMiddleware = require("../middleware/authMiddleware")

exports.getAllTryouts = async (req, res) => {
  try {
    const tryouts = await Tryout.find();
    res.status(200).json(tryouts);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data tryouts" });
  }
};

exports.createTryout = [authMiddleware,
    async (req, res) => {
    const { title, description } = req.body;
    try {
      const newTryout = new Tryout({ title, description });
      await newTryout.save();
      res.status(201).json(newTryout);
    } catch (error) {
      res.status(500).json({ error: "Gagal membuat tryout baru" });
    }
  }
];

exports.addQuestion = [authMiddleware,
    async (req, res) => {
      const { text, type, options, correctAnswer } = req.body;
      const tryout = await Tryout.findById(req.params.id);
      if (!tryout) return res.status(404).json({ error: "Tryout not found" });
    
      tryout.questions.push({ text, type, options, correctAnswer });
      await tryout.save();
      res.json({ message: "Question added successfully" });
    }
];

  exports.updateQuestion = async (req, res) => {
    const { text, type, options, correctAnswer } = req.body;
    const tryout = await Tryout.findById(req.params.id);
    if (!tryout) return res.status(404).json({ error: "Tryout not found" });
  
    const question = tryout.questions.id(req.params.questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });
  
    question.text = text;
    question.type = type;
    question.options = options;
    question.correctAnswer = correctAnswer;
  
    await tryout.save();
    res.json({ message: "Question updated successfully" });
  };
  
  exports.deleteQuestion = async (req, res) => {
    const tryout = await Tryout.findById(req.params.id);
    if (!tryout) return res.status(404).json({ error: "Tryout not found" });
  
    tryout.questions = tryout.questions.filter(q => q._id.toString() !== req.params.questionId);
    await tryout.save();
    res.json({ message: "Question deleted successfully" });
  };

  exports.getFilteredTryouts = async (req, res) => {
    const { title, category, startDate, endDate } = req.query; 
  
    try {
      const filter = {}; 
      if (title) {
        filter.title = { $regex: title, $options: 'i' }; 
      }
  
      if (category) {
        filter.category = { $regex: category, $options: 'i' };
      }
  
      if (startDate || endDate) {
        filter.createdAt = {}; 
  
        if (startDate) {
          filter.createdAt.$gte = new Date(startDate); 
        }
  
        if (endDate) {
          filter.createdAt.$lte = new Date(endDate); 
        }
      }

      const tryouts = await Tryout.find(filter);
      res.status(200).json(tryouts);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data tryouts dengan filter" });
    }
  };

  exports.submitTryout = [authMiddleware,
      async (req, res) => {
      const { answers } = req.body;
      const tryout = await Tryout.findById(req.params.id);
      if (!tryout) return res.status(404).json({ error: "Tryout not found" });
    
      tryout.submissions.push({ userId: req.user.userId, answers });
      await tryout.save();
      res.json({ message: "Tryout submitted successfully" });
    }
  ];
  