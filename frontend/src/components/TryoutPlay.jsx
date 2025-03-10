import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TryoutPlay() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tryouts/${id}`)
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.error(error));
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    axios.post(`http://localhost:5000/api/tryouts/${id}/submit`, { answers })
      .then(() => {
        alert("Tryout submitted successfully!");
        setIsSubmitted(true);
      })
      .catch(error => console.error(error));
  };

  const handleNext = () => {
    if (!answers[questions[currentIndex]._id]) {
      alert("Please answer the question before moving on.");
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Pengerjaan Tryout</h1>
      <div className="mb-4">
        <p>{questions[currentIndex].text}</p>
        <input
          type="text"
          className="border p-2 w-full"
          value={answers[questions[currentIndex]._id] || ""}
          onChange={(e) => handleAnswer(questions[currentIndex]._id, e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        {currentIndex > 0 && (
          <button className="bg-gray-500 text-white p-2" onClick={handlePrevious}>
            Sebelumnya
          </button>
        )}
        {currentIndex < questions.length - 1 ? (
          <button className="bg-blue-500 text-white p-2" onClick={handleNext}>
            Selanjutnya
          </button>
        ) : (
          <button
            className="bg-green-500 text-white p-2"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Sudah Disubmit" : "Submit"}
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm">
          Soal {currentIndex + 1} dari {questions.length}
        </p>
      </div>
    </div>
  );
}

export default TryoutPlay;
