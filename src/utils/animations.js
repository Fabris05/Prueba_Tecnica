export const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 12 },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
    },
    hover: {
        y: -5,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
    },
};

export const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};