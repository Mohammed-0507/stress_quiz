import { useState, useEffect, useCallback } from "react";
import "./App.css";

const translations = {
    en: {
        title: "Stress Management Test",
        description:
            "This test explores how you respond to pressure, recover after difficult moments, and use healthy coping strategies.",
        timerNote:
            "You have 20 seconds per question. Answer with your usual habits, not your ideal ones.",
        startQuiz: "Start Test",
        resultsTitle: "Your Stress Management Result",
        score: "Your Score:",
        level: "Profile:",
        profiles: {
            strong: {
                label: "Strong Stress Management",
                message:
                    "You show healthy stress-management habits and recover well in challenging situations.",
            },
            developing: {
                label: "Developing Stress Management",
                message:
                    "You already use some helpful strategies, but a few routines could make your stress management more consistent.",
            },
            support: {
                label: "Stress Management Needs Support",
                message:
                    "Stress may be taking too much space right now. Building simple coping routines or talking with a professional could help.",
            },
        },
        takeAgain: "Take the Test Again",
        question: "Question",
        of: "of",
        time: "Time:",
        questions: [
            {
                question:
                    "When you feel overwhelmed, how often do you pause before reacting?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "How often do you use breathing, walking, prayer, or another calming habit when stress rises?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "When your schedule gets heavy, how well do you prioritize what matters most?",
                options: ["Very well", "Well", "With difficulty", "Poorly"],
            },
            {
                question:
                    "How often do you sleep well enough to recover after a stressful day?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "If something goes wrong, how quickly do you regain focus?",
                options: [
                    "Very quickly",
                    "Fairly quickly",
                    "Slowly",
                    "With great difficulty",
                ],
            },
            {
                question:
                    "How often do you talk to someone you trust when stress becomes difficult?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "How well do you keep work or school pressure from affecting your relationships?",
                options: ["Very well", "Well", "With difficulty", "Poorly"],
            },
            {
                question:
                    "When you are under pressure, how often do you keep healthy eating and hydration habits?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "How often do you notice early signs of stress before they become too intense?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "How well do you separate rest time from work, study, or online pressure?",
                options: ["Very well", "Well", "With difficulty", "Poorly"],
            },
            {
                question:
                    "When plans change suddenly, how well do you adapt without panicking?",
                options: ["Very well", "Well", "With difficulty", "Poorly"],
            },
            {
                question:
                    "How often do you use exercise or movement to release tension?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "How well do you stop negative thoughts from taking over your day?",
                options: ["Very well", "Well", "With difficulty", "Poorly"],
            },
            {
                question:
                    "How often do you give yourself time to recover after a hard moment?",
                options: ["Always", "Often", "Sometimes", "Rarely"],
            },
            {
                question:
                    "Overall, how confident are you in your ability to manage stress in daily life?",
                options: [
                    "Very confident",
                    "Confident",
                    "A little unsure",
                    "Not confident",
                ],
            },
        ],
    },
    ar: {
        title: "اختبار إدارة التوتر",
        description:
            "يستكشف هذا الاختبار طريقة تعاملك مع الضغط، وقدرتك على التعافي بعد المواقف الصعبة، واستخدامك لأساليب صحية للتكيف.",
        timerNote:
            "لديك 20 ثانية لكل سؤال. أجب بحسب عاداتك الحقيقية وليس بحسب الإجابة المثالية.",
        startQuiz: "ابدأ الاختبار",
        resultsTitle: "نتيجة اختبار إدارة التوتر",
        score: "النتيجة:",
        level: "التصنيف:",
        profiles: {
            strong: {
                label: "إدارة قوية للتوتر",
                message:
                    "لديك عادات جيدة في إدارة التوتر وتستعيد توازنك بشكل جيد في المواقف الصعبة.",
            },
            developing: {
                label: "إدارة التوتر قيد التطور",
                message:
                    "لديك بعض الاستراتيجيات المفيدة بالفعل، لكن بعض العادات الإضافية قد تجعل إدارتك للتوتر أكثر ثباتاً.",
            },
            support: {
                label: "إدارة التوتر تحتاج إلى دعم",
                message:
                    "قد يكون التوتر مسيطراً بشكل كبير حالياً. بناء روتين بسيط للتكيف أو التحدث مع مختص قد يساعدك.",
            },
        },
        takeAgain: "أعد الاختبار",
        question: "السؤال",
        of: "من",
        time: "الوقت:",
        questions: [
            {
                question:
                    "عندما تشعر بالضغط، كم مرة تتوقف قليلاً قبل أن تتصرف؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "كم مرة تستخدم التنفس العميق أو المشي أو الدعاء أو أي عادة مهدئة عندما يرتفع التوتر؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "عندما تصبح مهامك كثيرة، ما مدى قدرتك على ترتيب الأولويات؟",
                options: ["ممتازة", "جيدة", "بصعوبة", "ضعيفة"],
            },
            {
                question:
                    "كم مرة تنام بشكل كافٍ لتتعافى بعد يوم مليء بالتوتر؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "إذا حدث أمر مزعج، ما مدى سرعة استعادة تركيزك؟",
                options: ["بسرعة كبيرة", "بسرعة معقولة", "ببطء", "بصعوبة كبيرة"],
            },
            {
                question:
                    "كم مرة تتحدث مع شخص تثق به عندما يصبح التوتر صعباً؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "ما مدى قدرتك على منع ضغط العمل أو الدراسة من التأثير على علاقاتك؟",
                options: ["ممتازة", "جيدة", "بصعوبة", "ضعيفة"],
            },
            {
                question:
                    "عندما تكون تحت الضغط، كم مرة تحافظ على عادات صحية في الأكل وشرب الماء؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "كم مرة تلاحظ علامات التوتر المبكرة قبل أن تصبح شديدة؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "ما مدى قدرتك على فصل وقت الراحة عن العمل أو الدراسة أو ضغط الإنترنت؟",
                options: ["ممتازة", "جيدة", "بصعوبة", "ضعيفة"],
            },
            {
                question:
                    "عندما تتغير الخطط فجأة، ما مدى قدرتك على التكيف دون ذعر؟",
                options: ["ممتازة", "جيدة", "بصعوبة", "ضعيفة"],
            },
            {
                question:
                    "كم مرة تستخدم الرياضة أو الحركة لتخفيف التوتر؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "ما مدى قدرتك على إيقاف الأفكار السلبية قبل أن تسيطر على يومك؟",
                options: ["ممتازة", "جيدة", "بصعوبة", "ضعيفة"],
            },
            {
                question:
                    "كم مرة تمنح نفسك وقتاً للتعافي بعد موقف صعب؟",
                options: ["دائماً", "غالباً", "أحياناً", "نادراً"],
            },
            {
                question:
                    "بشكل عام، ما مدى ثقتك بقدرتك على إدارة التوتر في حياتك اليومية؟",
                options: ["واثق جداً", "واثق", "متردد قليلاً", "غير واثق"],
            },
        ],
    },
    fr: {
        title: "Test de Gestion du Stress",
        description:
            "Ce test évalue votre manière de réagir à la pression, de récupérer après des moments difficiles et d'utiliser des stratégies d'adaptation saines.",
        timerNote:
            "Vous avez 20 secondes par question. Répondez selon vos habitudes réelles, pas selon la réponse idéale.",
        startQuiz: "Commencer le test",
        resultsTitle: "Votre résultat de gestion du stress",
        score: "Votre score :",
        level: "Profil :",
        profiles: {
            strong: {
                label: "Bonne gestion du stress",
                message:
                    "Vous montrez de bonnes habitudes de gestion du stress et vous récupérez bien dans les situations difficiles.",
            },
            developing: {
                label: "Gestion du stress en développement",
                message:
                    "Vous utilisez déjà certaines stratégies utiles, mais quelques routines supplémentaires pourraient rendre votre gestion du stress plus stable.",
            },
            support: {
                label: "Gestion du stress à renforcer",
                message:
                    "Le stress prend peut-être trop de place en ce moment. Mettre en place des habitudes simples ou parler à un professionnel pourrait vous aider.",
            },
        },
        takeAgain: "Refaire le test",
        question: "Question",
        of: "sur",
        time: "Temps :",
        questions: [
            {
                question:
                    "Quand vous vous sentez dépassé, à quelle fréquence prenez-vous une pause avant de réagir ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "À quelle fréquence utilisez-vous la respiration, la marche, la prière ou une autre habitude apaisante lorsque le stress augmente ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Lorsque votre emploi du temps devient chargé, dans quelle mesure arrivez-vous à prioriser l'essentiel ?",
                options: ["Très bien", "Bien", "Difficilement", "Mal"],
            },
            {
                question:
                    "À quelle fréquence dormez-vous suffisamment pour récupérer après une journée stressante ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Si quelque chose se passe mal, à quelle vitesse retrouvez-vous votre concentration ?",
                options: [
                    "Très vite",
                    "Assez vite",
                    "Lentement",
                    "Avec beaucoup de difficulté",
                ],
            },
            {
                question:
                    "À quelle fréquence parlez-vous à une personne de confiance lorsque le stress devient difficile à gérer ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Dans quelle mesure réussissez-vous à éviter que la pression du travail ou des études n'affecte vos relations ?",
                options: ["Très bien", "Bien", "Difficilement", "Mal"],
            },
            {
                question:
                    "Quand vous êtes sous pression, à quelle fréquence gardez-vous de bonnes habitudes d'alimentation et d'hydratation ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "À quelle fréquence remarquez-vous les premiers signes de stress avant qu'ils ne deviennent trop forts ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Dans quelle mesure arrivez-vous à séparer votre temps de repos du travail, des études ou de la pression en ligne ?",
                options: ["Très bien", "Bien", "Difficilement", "Mal"],
            },
            {
                question:
                    "Quand les plans changent soudainement, dans quelle mesure vous adaptez-vous sans paniquer ?",
                options: ["Très bien", "Bien", "Difficilement", "Mal"],
            },
            {
                question:
                    "À quelle fréquence utilisez-vous l'exercice ou le mouvement pour relâcher la tension ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Dans quelle mesure parvenez-vous à empêcher les pensées négatives de prendre le dessus sur votre journée ?",
                options: ["Très bien", "Bien", "Difficilement", "Mal"],
            },
            {
                question:
                    "À quelle fréquence vous accordez-vous du temps pour récupérer après un moment difficile ?",
                options: ["Toujours", "Souvent", "Parfois", "Rarement"],
            },
            {
                question:
                    "Globalement, dans quelle mesure vous sentez-vous capable de gérer le stress dans votre vie quotidienne ?",
                options: [
                    "Très capable",
                    "Plutôt capable",
                    "Un peu incertain",
                    "Pas capable",
                ],
            },
        ],
    },
};

const LANGUAGE_LABELS = {
    en: "English",
    ar: "العربية",
    fr: "Français",
};

const TOTAL_QUESTIONS = 15;
const MAX_SCORE = TOTAL_QUESTIONS * 3;

function App() {
    const [language, setLanguage] = useState("fr");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isActive, setIsActive] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const t = translations[language];

    const handleTimeout = useCallback(() => {
        setAnswers((prev) => [...prev, 3]);
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
                setTimeLeft((value) => value - 1);
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

    const getProfileKey = (score) => {
        if (score <= 15) return "strong";
        if (score <= 30) return "developing";
        return "support";
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
        const profileKey = getProfileKey(score);
        const profile = t.profiles[profileKey];

        return (
            <div className="quiz-container fade-in">
                <div className="language-selector">
                    {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                        <button key={code} onClick={() => setLanguage(code)}>
                            {label}
                        </button>
                    ))}
                </div>
                <h1>{t.resultsTitle}</h1>
                <div className="results">
                    <h2>
                        {t.score} {score}/{MAX_SCORE}
                    </h2>
                    <h3>
                        {t.level} {profile.label}
                    </h3>
                    <p>{profile.message}</p>
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
                    {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                        <button key={code} onClick={() => setLanguage(code)}>
                            {label}
                        </button>
                    ))}
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
                {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                    <button key={code} onClick={() => setLanguage(code)}>
                        {label}
                    </button>
                ))}
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
