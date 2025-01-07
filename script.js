document.getElementById('lang-toggle').addEventListener('click', function() {
    const lang = this.textContent === 'EN' ? 'JA' : 'EN';
    this.textContent = lang;

    if (lang === 'EN') {
        document.body.innerHTML = document.body.innerHTML.replace(/茜-あかね-/g, "Akane").replace(/ようこそ！.*?へ/g, "Welcome to Discord Bot Akane!");
    } else {
        location.reload(); // Reload to restore Japanese
    }
});
