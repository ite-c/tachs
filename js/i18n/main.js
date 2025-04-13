/**
 * Language switcher implementation for TACH Africa website
 */

// Current language and translations storage
let currentLanguage = 'en';
const translations = {};

/**
 * Loads a language module
 * @param {string} lang - Language code to load (e.g., 'en', 'fr')
 * @returns {Promise} - Promise that resolves when language is loaded
 */
async function loadLanguage(lang) {
    try {
        // Dynamically import the language file
        const module = await import(`./${lang}.js`);
        translations[lang] = module.default;
        console.log(`Loaded language: ${lang}`);
        return translations[lang];
    } catch (error) {
        console.error(`Failed to load language: ${lang}`, error);
        return null;
    }
}

/**
 * Changes the current language
 * @param {string} lang - Language code to change to
 * @returns {Promise} - Promise that resolves when language is changed
 */
async function changeLanguage(lang) {
    if (!translations[lang]) {
        await loadLanguage(lang);
    }
    
    if (translations[lang]) {
        currentLanguage = lang;
        
        // Update page content with new translations
        updatePageContent();
        
        // Save language preference
        localStorage.setItem('tach-language', lang);
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
        
        return true;
    }
    
    return false;
}

/**
 * Updates page content with translations from the current language
 */
function updatePageContent() {
    if (!translations[currentLanguage]) return;
    
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update elements with data-i18n-attr attribute (for attributes like placeholder, title, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
        const data = element.getAttribute('data-i18n-attr').split(',');
        
        data.forEach(item => {
            const [attr, key] = item.trim().split(':');
            const translation = getNestedTranslation(translations[currentLanguage], key);
            
            if (translation && attr) {
                element.setAttribute(attr, translation);
            }
        });
    });
}

/**
 * Gets a nested translation value from an object using dot notation
 * @param {Object} obj - The object to search in
 * @param {string} path - Dot notation path (e.g., 'navigation.home')
 * @returns {string|null} - The translation or null if not found
 */
function getNestedTranslation(obj, path) {
    if (!obj || !path) return null;
    
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return null;
        }
    }
    
    return result;
}

/**
 * Initializes the language based on saved preference or browser language
 */
async function initLanguage() {
    // Try to get language from localStorage
    let lang = localStorage.getItem('tach-language');
    
    // If no saved preference, detect browser language
    if (!lang) {
        const browserLang = navigator.language.split('-')[0];
        lang = ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
    }
    
    // Load and apply the language
    await changeLanguage(lang);
    
    // Update UI
    const currentLangEl = document.getElementById('current-lang');
    if (currentLangEl) {
        currentLangEl.textContent = lang.toUpperCase();
    }
    
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Make functions globally available
window.changeLanguage = changeLanguage;
window.updatePageContent = updatePageContent;
window.loadLanguage = loadLanguage;

// Initialize language when DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage);

export {
    changeLanguage,
    loadLanguage,
    updatePageContent,
    initLanguage
}; 