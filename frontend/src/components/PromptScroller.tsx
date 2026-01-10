import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const promptsRow1 = [
    "How to grow organic tomatoes? 🍅",
    "Best fertilizer for wheat crops? 🌾",
    "Weather forecast for my region 🌤️",
    "Tips for soil health improvement 🌱",
    "Common rice plant diseases 🔬",
    "Government schemes for small farmers 🏛️",
];

const promptsRow2 = [
    "How to start hydroponics at home? 💧",
    "Irrigation techniques for dry land 🚜",
    "Pest control for cotton farming 🐛",
    "Today's market prices for onions 📊",
    "When to sow mustard in North India? ❄️",
    "Organic pesticides for brinjal 🍆",
];

const promptsRow3 = [
    "Sustainable farming practices 🌎",
    "Cattle health and nutrition tips 🐄",
    "How to store potatoes for longer? 🥔",
    "Solar power benefits for irrigation ☀️",
    "Bee keeping for extra income 🐝",
    "Drip irrigation system cost 🚿",
];

interface ScrollingRowProps {
    prompts: string[];
    direction: 'left' | 'right';
    speed: number;
}

const ScrollingRow = ({ prompts, direction, speed }: ScrollingRowProps) => {
    const navigate = useNavigate();

    // Duplicate prompts for seamless looping
    const dupPrompts = [...prompts, ...prompts, ...prompts];

    const handlePromptClick = (prompt: string) => {
        navigate('/chat', { state: { initialPrompt: prompt } });
    };

    return (
        <div className="flex overflow-hidden py-3 select-none">
            <motion.div
                className="flex whitespace-nowrap gap-4 px-4"
                animate={{
                    x: direction === 'left' ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {dupPrompts.map((prompt, index) => (
                    <button
                        key={`${prompt}-${index}`}
                        onClick={() => handlePromptClick(prompt)}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-green-100 dark:border-green-800/50 rounded-full shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap"
                    >
                        <Sparkles size={16} className="text-green-500 group-hover:scale-125 transition-transform" />
                        {prompt}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-green-500" />
                    </button>
                ))}
            </motion.div>
        </div>
    );
};

const PromptScroller = () => {
    return (
        <section className="py-12 bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-950/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Ask AgriGPT Anything 💬
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Click on any suggestion below to start a conversation
                    </p>
                </motion.div>
            </div>

            <div className="relative group">
                {/* Row 1: Left to Right */}
                <ScrollingRow prompts={promptsRow1} direction="right" speed={40} />

                {/* Row 2: Right to Left */}
                <ScrollingRow prompts={promptsRow2} direction="left" speed={45} />

                {/* Row 3: Left to Right */}
                <ScrollingRow prompts={promptsRow3} direction="right" speed={50} />

                {/* Side Gradients for fading effect */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-green-50/50 via-green-50/20 to-transparent dark:from-gray-900 pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-green-50/50 via-green-50/20 to-transparent dark:from-gray-900 pointer-events-none z-10" />
            </div>
        </section>
    );
};

export default PromptScroller;
