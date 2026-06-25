document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".actions").forEach((actionsContainer) => {
        const versionView = actionsContainer.querySelector('.version-view');
        const versionList = actionsContainer.querySelector('.version-list');
        const downloadLatestBtn = actionsContainer.querySelector('.download-latest');

        if (versionView && versionList) {
            versionView.addEventListener('click', function(event) {
                event.stopPropagation();                
                document.querySelectorAll('.version-list.show').forEach(list => {
                    if (list !== versionList) list.classList.remove('show');
                });
                versionList.classList.toggle('show');
            });
        }

        if (downloadLatestBtn && versionList) {
            downloadLatestBtn.addEventListener('click', (event) => {
                const latestRelease = versionList.querySelector('a[download]');
                if (latestRelease) {
                    const tmpLink = document.createElement('a');
                    tmpLink.href = latestRelease.href;
                    tmpLink.download = latestRelease.download || '';
                    document.body.appendChild(tmpLink);
                    tmpLink.click();
                    tmpLink.remove();
                }
            });
        }

        actionsContainer.addEventListener("click", (event) => {
            const downloadTarget = event.target.closest("a[download], .download-latest");
            
            if (downloadTarget && !actionsContainer.classList.contains("loading")) {
                event.stopPropagation();

                if (versionList) versionList.classList.remove('show');

                actionsContainer.classList.add("loading");

                const loader = document.createElement("div");
                loader.className = "loader";
                actionsContainer.insertBefore(loader, actionsContainer.firstChild);

                setTimeout(() => {
                    loader.remove();
                    actionsContainer.classList.remove("loading");
                }, 3000);
            }
        });
    });

    window.addEventListener('click', function() {
        document.querySelectorAll('.version-list.show').forEach((list) => {
            list.classList.remove('show');
        });
    });
});