const siteConfig = {
    theme: {
        primaryColor: "#00ffcc",
        secondaryColor: "#9370DB",
        backgroundColor: "#0a0a23",
    },
    animations: {
        cometSpawnRate: 0.01,
        particleMax: 100,
        typingSpeed: 100,
    },
    sections: {
        showAbout: true,
        showProjects: true,
        showContact: true,
        showTransmission: false,
    },
};

const siteContent = {
    pilotName: "M.reza Asgari",
    tagline: "I'm a Data Scientist",
    about: {
        heading: "About Me:",
        description: "Data Scientist & Analyst with IBM-certified expertise in Python, SQL, and machine learning. Skilled in data analysis, visualization, and predictive modeling to drive business decisions."
    },
    projects: {
        heading: "Projects:",
        items: [
            {
                title: "FlashUSDT",
                description: "This project deploys a custom ERC-20 token called \"Flash USDT\" (FUSDT) on the Ethereum Sepolia testnet. It mints 1,000,000 FUSDT to the deployer's wallet.",
                link: "https://github.com/m9reza/FlashUSDT",
                image: "images/flashusdt.png"
            },
            {
                title: "Multi Currency Seed Finder",
                description: "This Python script is an educational experiment designed to generate mnemonic seed phrases using the bitcoinlib library and check for associated wallet balances across Bitcoin, Litecoin, and Dogecoin networks.",
                link: "https://github.com/m9reza/Multi-Currency-Seed-Finder",
                image: "images/seed-finder.png"
            },
            {
                title: "IBM Applied Data Science Capstone",
                description: "This is my IBM capstone project for data science.",
                link: "https://github.com/m9reza/Applied-Data-Science-Capstone-IBM",
                image: "images/ibm-capstone.png"
            },
            {
                title: "Token auth project",
                description: "A Django web app with manual token-based authentication (access and refresh tokens) for user registration, login, and posting content.",
                link: "https://github.com/m9reza/token_auth_project",
                image: "images/token-auth.png"
            },
            {
                title: "Titanic Survival Prediction",
                description: "A machine learning solution for the Kaggle Titanic competition, using Random Forest and XGBoost with feature engineering and ensemble methods.",
                link: "https://github.com/m9reza/Titanic-Survival-Prediction",
                image: "images/titanic.png"
            },
        ]
    },
    contact: {
        heading: "Contact:",
        telegramLabel: "Telegram:",
        telegram: "https://t.me/m9reza0o0",
        buttonText: "Initiate Contact"
    }
};
