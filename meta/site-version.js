const versionView = document.getElementById('versionView');
const versionList = document.getElementById('versionList');

versionView.addEventListener('click', function(event) {
    event.stopPropagation();
    versionList.classList.toggle('show');
});

window.addEventListener('click', function() {
    if (versionList.classList.contains('show')) {
        versionList.classList.remove('show');
    }
});