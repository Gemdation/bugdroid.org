document.addEventListener("DOMContentLoaded", () => {
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

    const actionsContainer = document.querySelector(".actions");

    if (!actionsContainer) return;

    actionsContainer.addEventListener("click", (event) => {
        const downloadTarget = event.target.closest("a[download], .download-link");

        if (downloadTarget) {
            event.stopPropagation();

            const elementsToReplace = Array.from(actionsContainer.children).filter(
                (child) => !child.classList.contains("rating")
            );

            const savedState = elementsToReplace.map((element) => element.cloneNode(true));

            elementsToReplace.forEach((element) => element.remove());

            const loader = document.createElement("div");
            loader.className = "loader";
            actionsContainer.insertBefore(loader, actionsContainer.firstChild);

            setTimeout(() => {
                loader.remove();
                const ratingElement = actionsContainer.querySelector(".rating");
                savedState.forEach((clonedElement) => {
                    actionsContainer.insertBefore(clonedElement, ratingElement);
                });
            }, 3000);
        }
    });
});