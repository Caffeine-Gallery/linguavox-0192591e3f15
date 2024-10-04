import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const languageSelect = document.getElementById('languageSelect');
const translationOutput = document.getElementById('translationOutput');
const speakButton = document.getElementById('speakButton');
const historyList = document.getElementById('historyList');
const hiddenPlatypus = document.getElementById('hiddenPlatypus');

let currentTranslation = '';

async function translateText() {
    const text = inputText.value;
    const targetLang = languageSelect.value;

    if (text.trim() === '') {
        translationOutput.textContent = '';
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        currentTranslation = data.responseData.translatedText;
        translationOutput.textContent = currentTranslation;

        // Add translation to backend
        await backend.addTranslation(text, currentTranslation, targetLang);
        updateTranslationHistory();
    } catch (error) {
        console.error('Translation error:', error);
        translationOutput.textContent = 'Translation error occurred.';
    }
}

function speakTranslation() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation);
        utterance.lang = languageSelect.value;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

async function updateTranslationHistory() {
    const history = await backend.getTranslationHistory();
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.original} → ${entry.translated} (${entry.language})`;
        historyList.appendChild(li);
    });
}

async function loadHiddenPlatypus() {
    const platypusImage = await backend.getHiddenPlatypus();
    hiddenPlatypus.src = platypusImage;
}

inputText.addEventListener('input', translateText);
languageSelect.addEventListener('change', translateText);
speakButton.addEventListener('click', speakTranslation);

// Initial load
updateTranslationHistory();
loadHiddenPlatypus();
