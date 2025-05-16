'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import SuccessModal from '@/components/SuccessModal';

const questions = [
  {
    id: 1,
    title: 'Calidad del Servicio',
    description: '¿Cómo calificaría la calidad del servicio recibido?',
    type: 'rating',
  },
  {
    id: 2,
    title: 'Sabor de los Tacos',
    description: '¿Cómo calificaría el sabor de los tacos?',
    type: 'rating',
  },
  {
    id: 3,
    title: 'Atención del Personal',
    description: '¿Cómo calificaría la atención del personal?',
    type: 'rating',
  },
  {
    id: 4,
    title: 'Tiempo de Espera',
    description: '¿El tiempo de espera fue aceptable?',
    type: 'rating',
  },
  {
    id: 5,
    title: 'Limpieza del Local',
    description: '¿Cómo calificaría la limpieza del local?',
    type: 'rating',
  },
  {
    id: 6,
    title: 'Variedad de Opciones',
    description: '¿La variedad de opciones fue suficiente?',
    type: 'rating',
  },
  {
    id: 7,
    title: 'Precio vs Calidad',
    description: '¿Considera que el precio es acorde a la calidad?',
    type: 'rating',
  },
  {
    id: 8,
    title: 'Calidad de los Ingredientes',
    description: '¿Cómo calificaría la calidad de los ingredientes?',
    type: 'rating',
  },
  {
    id: 9,
    title: 'Presentación de los Tacos',
    description: '¿Cómo calificaría la presentación de los tacos?',
    type: 'rating',
  },
  {
    id: 10,
    title: 'Sabor de los Aderezos',
    description: '¿Los aderezos acompañaron bien los tacos?',
    type: 'rating',
  },
  {
    id: 11,
    title: 'Calidad de las Bebidas',
    description: '¿Cómo calificaría las bebidas?',
    type: 'rating',
  },
  {
    id: 12,
    title: 'Espacio para Comer',
    description: '¿El espacio para comer fue cómodo?',
    type: 'rating',
  },
  {
    id: 13,
    title: 'Sistema de Pago',
    description: '¿El sistema de pago fue fácil de usar?',
    type: 'rating',
  },
  {
    id: 14,
    title: 'Recomendaría el Lugar',
    description: '¿Recomendaría Tacos Bora Bora a otras personas?',
    type: 'rating',
  },
  {
    id: 15,
    title: 'Comentarios Adicionales',
    description: '¿Tiene algún comentario adicional?',
    type: 'text',
  },
];

export default function FeedbackPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRatingChange = (questionId: number, value: number | string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Solo mostrar el modal si estamos en la última pregunta
    if (currentQuestion === questions.length - 1) {
      setShowSuccessModal(true);
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-bora-brown pt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-bora-black/80 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bebas text-bora-yellow text-center mb-8">
            Encuesta de Satisfacción
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bebas text-white">{currentQuestionData.title}</h2>
              <p className="text-gray-300">{currentQuestionData.description}</p>

              {currentQuestionData.type === 'rating' && (
                <div className="flex justify-center space-x-4 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(currentQuestionData.id, star)}
                      className={`p-2 rounded-lg transition-colors ${
                        responses[currentQuestionData.id] === star
                          ? 'bg-bora-yellow text-bora-black'
                          : 'bg-bora-brown/50 text-white hover:bg-bora-brown/70'
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestionData.type === 'text' && (
                <textarea
                  className="w-full p-3 rounded-lg bg-bora-brown/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bora-yellow"
                  placeholder="Escribe tus comentarios aquí..."
                  onChange={(e) => handleRatingChange(currentQuestionData.id, e.target.value)}
                />
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg bg-bora-brown/50 text-white hover:bg-bora-brown/70 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-bora-yellow text-bora-black hover:bg-yellow-400 flex items-center space-x-2"
                >
                  <span>Enviar</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-bora-yellow text-bora-black hover:bg-yellow-400 flex items-center space-x-2"
                >
                  <span>Siguiente</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-400">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = '/';
        }}
        message="¡Gracias por completar la encuesta!"
      />
    </div>
  );
}
