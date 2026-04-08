import { useState, useEffect, useCallback } from "react";
import "./App.css";

const translations = {
    en: {
        title: "Stress Level Quiz",
        description:
            "This quiz will assess your current stress levels. Answer honestly for the best results.",
        timerNote:
            "You have 20 seconds per question. Time pressure is part of the stress simulation.",
        startQuiz: "Start Quiz",
        resultsTitle: "Stress Quiz Results",
        score: "Your Stress Score:",
        level: "Stress Level:",
        lowStress:
            "You seem to be managing stress well. Keep up the good work!",
        moderateStress:
            "You experience moderate stress. Consider stress management techniques.",
        highStress:
            "You may be experiencing high levels of stress. Consider seeking professional help.",
        takeAgain: "Take Quiz Again",
        question: "Question",
        of: "of",
        time: "Time:",
        questions: [
            {
                question:
                    "How often do you feel overwhelmed by your daily responsibilities?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "Do you have difficulty falling asleep or staying asleep due to stress?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "How frequently do you experience feelings of anxiety?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "Do you find it hard to relax even when you have free time?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "How often do you feel irritable or easily angered?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "Do you experience physical symptoms like headaches or stomach issues from stress?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "How much does work or study pressure affect your mood?",
                options: ["Not at all", "A little", "Moderately", "A lot"],
            },
            {
                question:
                    "Do you feel like you have too many things to do and not enough time?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "How often do you worry about future events?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "Do you avoid social situations because of stress?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "How frequently do you feel tired or exhausted?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "Do you have trouble concentrating due to stress?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "How often do you feel lonely or isolated?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question:
                    "Do you use unhealthy coping mechanisms like overeating or drinking when stressed?",
                options: ["Never", "Rarely", "Sometimes", "Often"],
            },
            {
                question: "How much does stress impact your relationships?",
                options: ["Not at all", "A little", "Moderately", "A lot"],
            },
        ],
    },
    ar: {
        title: "اختبار مستوى التوتر",
        description:
            "سيقيم هذا الاختبار مستويات التوتر الحالية لديك. أجب بصدق للحصول على أفضل النتائج.",
        timerNote: "لديك 20 ثانية لكل سؤال. الضغط الزمني جزء من محاكاة التوتر.",
        startQuiz: "ابدأ الاختبار",
        resultsTitle: "نتائج اختبار التوتر",
        score: "نتيجة التوتر الخاصة بك:",
        level: "مستوى التوتر:",
        lowStress: "يبدو أنك تتعامل مع التوتر بشكل جيد. استمر في العمل الجيد!",
        moderateStress: "أنت تعاني من توتر متوسط. فكر في تقنيات إدارة التوتر.",
        highStress:
            "قد تعاني من مستويات عالية من التوتر. فكر في طلب المساعدة المهنية.",
        takeAgain: "خذ الاختبار مرة أخرى",
        question: "السؤال",
        of: "من",
        time: "الوقت:",
        questions: [
            {
                question: "كم مرة تشعر بالإرهاق من مسؤولياتك اليومية؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question:
                    "هل تواجه صعوبة في النوم أو البقاء نائماً بسبب التوتر؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم مرة تشعر بالقلق؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question:
                    "هل تجد صعوبة في الاسترخاء حتى عندما يكون لديك وقت فراغ؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم مرة تشعر بالتهيج أو الغضب بسهولة؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question:
                    "هل تعاني من أعراض جسدية مثل الصداع أو مشاكل المعدة بسبب التوتر؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم يؤثر ضغط العمل أو الدراسة على مزاجك؟",
                options: [
                    "لا يؤثر على الإطلاق",
                    "قليلاً",
                    "بشكل معتدل",
                    "كثيراً",
                ],
            },
            {
                question:
                    "هل تشعر أن لديك الكثير من الأشياء للقيام بها ولا وقت كافٍ؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم مرة تقلق بشأن الأحداث المستقبلية؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "هل تتجنب المواقف الاجتماعية بسبب التوتر؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم مرة تشعر بالتعب أو الإرهاق؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "هل تواجه صعوبة في التركيز بسبب التوتر؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم مرة تشعر بالوحدة أو العزلة؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question:
                    "هل تستخدم آليات تعامل غير صحية مثل الإفراط في الأكل أو الشرب عند التوتر؟",
                options: ["أبداً", "نادراً", "أحياناً", "غالباً"],
            },
            {
                question: "كم يؤثر التوتر على علاقاتك؟",
                options: [
                    "لا يؤثر على الإطلاق",
                    "قليلاً",
                    "بشكل معتدل",
                    "كثيراً",
                ],
            },
        ],
    },
    fr: {
        title: "Test du Niveau de Stress",
        description:
            "Ce quiz évaluera vos niveaux de stress actuels. Répondez honnêtement pour obtenir les meilleurs résultats.",
        timerNote:
            "Vous avez 20 secondes par question. La pression temporelle fait partie de la simulation du stress.",
        startQuiz: "Commencer le Quiz",
        resultsTitle: "Résultats du Test de Stress",
        score: "Votre Score de Stress:",
        level: "Niveau de Stress:",
        lowStress:
            "Vous semblez gérer le stress correctement. Continuez le bon travail!",
        moderateStress:
            "Vous ressentez un stress modéré. Pensez à des techniques de gestion du stress.",
        highStress:
            "Vous pourriez ressentir des niveaux élevés de stress. Pensez à consulter un professionnel.",
        takeAgain: "Refaire le Quiz",
        question: "Question",
        of: "de",
        time: "Temps:",
        questions: [
            {
                question:
                    "À quelle fréquence vous sentez-vous dépassé par vos responsabilités quotidiennes?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Avez-vous des difficultés à vous endormir ou à rester endormi à cause du stress?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "À quelle fréquence ressentez-vous des sentiments d'anxiété?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Trouvez-vous difficile de vous détendre même lorsque vous avez du temps libre?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "À quelle fréquence vous sentez-vous irritable ou facilement en colère?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Ressentez-vous des symptômes physiques comme des maux de tête ou des problèmes d'estomac dus au stress?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "À quel point la pression du travail ou des études affecte-t-elle votre humeur?",
                options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
            },
            {
                question:
                    "Vous sentez-vous avoir trop de choses à faire et pas assez de temps?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "À quelle fréquence vous inquiétez-vous des événements futurs?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Évitez-vous les situations sociales à cause du stress?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "À quelle fréquence vous sentez-vous fatigué ou épuisé?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Avez-vous des difficultés à vous concentrer à cause du stress?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question: "À quelle fréquence vous sentez-vous seul ou isolé?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question:
                    "Utilisez-vous des mécanismes d'adaptation malsains comme trop manger ou boire quand vous êtes stressé?",
                options: ["Jamais", "Rarement", "Parfois", "Souvent"],
            },
            {
                question: "À quel point le stress affecte-t-il vos relations?",
                options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
            },
        ],
    },
};

function App() {
    const [language, setLanguage] = useState("en");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isActive, setIsActive] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const t = translations[language];

    const handleTimeout = useCallback(() => {
        // Add extra stress point for timeout
        setAnswers((prev) => [...prev, 3]); // Max stress
        setTimeLeft(20);
        if (currentQuestion < t.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setShowResults(true);
            setIsActive(false);
        }
    }, [currentQuestion, t.questions.length]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimeout();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, handleTimeout]);

    const startQuiz = () => {
        setIsActive(true);
    };

    const handleAnswer = (answerIndex) => {
        const newAnswers = [...answers, answerIndex];
        setAnswers(newAnswers);
        setTimeLeft(20);
        if (currentQuestion < t.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            setIsActive(false);
        }
    };

    const calculateScore = () => {
        return answers.reduce((sum, answer) => sum + answer, 0);
    };

    const getStressLevel = (score) => {
        if (score <= 15) return "Low Stress";
        if (score <= 30) return "Moderate Stress";
        return "High Stress";
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setTimeLeft(20);
        setIsActive(false);
        setShowResults(false);
    };

    if (showResults) {
        const score = calculateScore();
        const level = getStressLevel(score);
        return (
            <div className="quiz-container fade-in">
                <div className="language-selector">
                    <button onClick={() => setLanguage("en")}>English</button>
                    <button onClick={() => setLanguage("ar")}>العربية</button>
                    <button onClick={() => setLanguage("fr")}>Français</button>
                </div>
                <h1>{t.resultsTitle}</h1>
                <div className="results">
                    <h2>
                        {t.score} {score}/45
                    </h2>
                    <h3>
                        {t.level} {level}
                    </h3>
                    <p>
                        {level === "Low Stress" && t.lowStress}
                        {level === "Moderate Stress" && t.moderateStress}
                        {level === "High Stress" && t.highStress}
                    </p>
                </div>
                <button className="reset-btn" onClick={resetQuiz}>
                    {t.takeAgain}
                </button>
            </div>
        );
    }

    if (!isActive) {
        return (
            <div className="quiz-container fade-in">
                <div className="language-selector">
                    <button onClick={() => setLanguage("en")}>English</button>
                    <button onClick={() => setLanguage("ar")}>العربية</button>
                    <button onClick={() => setLanguage("fr")}>Français</button>
                </div>
                <h1>{t.title}</h1>
                <p>{t.description}</p>
                <p>{t.timerNote}</p>
                <button className="start-btn" onClick={startQuiz}>
                    {t.startQuiz}
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container fade-in">
            <div className="language-selector">
                <button onClick={() => setLanguage("en")}>English</button>
                <button onClick={() => setLanguage("ar")}>العربية</button>
                <button onClick={() => setLanguage("fr")}>Français</button>
            </div>
            <div className="timer">
                <div
                    className="timer-bar"
                    style={{ width: `${(timeLeft / 20) * 100}%` }}
                ></div>
                <span>
                    {t.time} {timeLeft}s
                </span>
            </div>
            <h2>
                {t.question} {currentQuestion + 1} {t.of} {t.questions.length}
            </h2>
            <p className="question">{t.questions[currentQuestion].question}</p>
            <div className="options">
                {t.questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className="option-btn"
                        onClick={() => handleAnswer(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
