const funFacts = [
    "Did you know that cats sleep for around 70% of their lives?",
    "A group of cats is called a clowder.",
    "Cats have specialized collarbones for landing on their feet when falling.",
    "Cats can reach speeds of up to 48 km/h.",
    "Each cat has a unique nose print, similar to a human's fingerprint.",
    "With their excellent hearing, cats can detect higher-frequency sounds compared to humans.",
    "Grooming is a significant part of a cat's routine to maintain clean fur.",
    "The remarkable sense of balance in cats enables them to land on their feet from great heights.",
    "Cats have different numbers of toes on their front and back paws.",
    "Using a specialized tongue, cats groom themselves and drink efficiently.",
    "A cat's ears have 32 muscles, contributing to their auditory flexibility.",
    "A cat's third eyelid, called a haw, protects their eyes.",
    "Scent glands on a cat's cheeks, paws, and tail are used for marking territory.",
    "Cats have a reflective layer, the tapetum lucidum, enhancing their night vision.",
    "Cats' flexible spines allow them to navigate with agility.",
    "Cats use the Jacobson's organ in their mouth to analyze scents effectively.",
    "Cats have retractable claws for protection and sharpness.",
    "Cats engage in grooming each other as a form of social bonding.",
    "With heightened sensitivity to vibrations, cats detect small movements and potential prey.",
    "Through various vocalizations like meows, purrs, and trills, cats communicate.",
    "For over 4,000 years, cats have been domesticated, forming close bonds with humans."
];

function getRandomFunFact() {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
}

function typeWriter() {
    const funFactElement = document.getElementById("funFact");
    const typingSpeed = 25;
    let fact = getRandomFunFact();
    let i = 0;

    function typeCharacter() {
        if (i < fact.length) {
            let currentWord = fact.substring(i);
            let match = currentWord.match(/^(C|c)ats?\b/);

            if (match) {
                let word = match[0];
                let link = `<a href="https://www.google.com/search?q=${word}&tbm=isch" target="_blank" style="color: #00a67d">${word}</a>`;
                funFactElement.innerHTML += link;
                i += word.length - 1;
            } else {
                funFactElement.innerHTML += fact.charAt(i);
            }

            setTimeout(typeCharacter, typingSpeed);
            i++;
        } else {
            // After typing the full fact, wait for 4 seconds, then start deleting characters
            setTimeout(() => {
                deleteCharacters(fact.length);
            }, 4000);
        }
    }

    function deleteCharacters(count) {
        if (count >= 0) {
            // Delete characters one by one from the end of the fact
            funFactElement.innerHTML = fact.substring(0, count);
            setTimeout(() => {
                deleteCharacters(count - 1);
            }, 7);
        } else {
            // After deleting all characters, wait for 0.5 seconds and then start the typeWriter function again
            setTimeout(typeWriter, 500);
        }
    }

    // Start typing characters from the beginning of the fact
    typeCharacter();
}

// Call the typeWriter function to initiate the typing animation
typeWriter();
