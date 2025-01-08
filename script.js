document.getElementById("lang-toggle").addEventListener("click", function () {
    const currentLang = document.documentElement.lang;
    document.documentElement.lang = currentLang === "ja" ? "en" : "ja";
    this.textContent = currentLang === "ja" ? "日本語" : "English";
});
