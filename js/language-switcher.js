// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLangBtn = document.querySelector('.current-lang');
    const langDropdown = document.querySelector('.lang-dropdown');
    let currentLang = 'km'; // Default language

    // Toggle dropdown
    currentLangBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        langDropdown.classList.toggle('show');
    });

    // Handle language selection
    document.querySelectorAll('.lang-dropdown li').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const newLang = item.dataset.lang;
            if (newLang !== currentLang) {
                currentLang = newLang;
                updateLanguage();
            }
            langDropdown.classList.remove('show');
            
            // Update active state
            document.querySelectorAll('.lang-dropdown li').forEach(li => {
                li.classList.remove('active');
            });
            item.classList.add('active');
            
            // Update button text
            currentLangBtn.querySelector('.lang-text').textContent = item.textContent;
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageSwitcher.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });

    function updateLanguage() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[currentLang] && translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });

        // Update modal content if it's open
        const modal = document.getElementById('modal1');
        if (modal && modal.style.display === "flex") {
            const modalTitle = modal.querySelector('.modal-title');
            const modalDescription = modal.querySelector('.modal-description');
            const modalTipsList = modal.querySelector('.modal-tips ul');
            
            if (modalTitle && modalTitle.dataset.translate) {
                modalTitle.textContent = translations[currentLang][modalTitle.dataset.translate] || modalTitle.textContent;
            }
            if (modalDescription && modalDescription.dataset.translate) {
                modalDescription.textContent = translations[currentLang][modalDescription.dataset.translate] || modalDescription.textContent;
            }
            
            // Update tips
            if (modalTipsList) {
                modalTipsList.querySelectorAll('li[data-translate]').forEach(tip => {
                    if (tip.dataset.translate) {
                        tip.textContent = translations[currentLang][tip.dataset.translate] || tip.textContent;
                    }
                });
            }
        }
    }

    // Initialize language
    updateLanguage();
}); 