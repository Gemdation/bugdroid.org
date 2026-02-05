(async () => {
    const owner = 'Gemdation';
    const repo = 'bugdroid.org';
    
    let currentPath = window.location.pathname.replace(/^\//, ''); const lastSegment = currentPath.split('/').pop();
    if (lastSegment && lastSegment.includes('.')) {currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));}
    if (currentPath.endsWith('/')) {currentPath = currentPath.slice(0, -1);}
    try {const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`);
    if (!response.ok) {if (response.status === 404) {
    document.getElementById('droid-directory').innerHTML = `<p>Directory or repository not found: <code>/${currentPath}</code>. Please check the URL or repository name.</p>`;return;}
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);}
    
    let data = await response.json();

    const iconMap = {
        'apk': '/meta/dir-apk.png',
        'css': '/meta/dir-css.png',
        'ttf': '/meta/dir-font.png',
        'psd': '/meta/dir-image-editable.png',
        'svg': '/meta/dir-image-editable.png',
        'gif': '/meta/dir-image.png',
        'ico': '/meta/dir-image.png',
        'js': '/meta/dir-javascript.png',
        'mp3': '/meta/dir-sound.png',
        'ogg': '/meta/dir-sound.png',
        'txt': '/meta/dir-text.png',
        'md': '/meta/dir-text.png',
        'mp4': '/meta/dir-video.png',
        'webp': '/meta/dir-image.png',
        'png': '/meta/dir-image.png',
        'jpg': '/meta/dir-image.png',
        'zip': '/meta/dir-zip.png',
    };

    data = data.filter(item => item.name !== 'index.html');
    data.sort((a, b) => {
        if (a.type === 'dir' && b.type !== 'dir') {return -1;}
        if (a.type !== 'dir' && b.type === 'dir') {return 1;}
        return a.name.localeCompare(b.name);});

    let htmlStrings = [];

    if (currentPath !== '') {
        const parentPathArray = currentPath.split('/');
        parentPathArray.pop();
        const parentLink = parentPathArray.join('/');        
        const previousIcon = '/meta/dir-previous.png'; 
        const parentHref = parentLink === '' ? '/' : `/${parentLink}/`;
        htmlStrings.push(`<li><a href="${parentHref}"><img src="${previousIcon}" alt="parent directory"> ..</a></li>`);
    }

    for (const item of data) {
        let iconSrc = '/meta/dir-unknown.png';
        let itemLink = `/${item.path}`; 

        if (item.type === 'dir') {
        iconSrc = '/meta/dir-previous.png'; 
        itemLink = `/${item.path}/`;} else {
        const fileExtension = item.name.split('.').pop().toLowerCase();
        if (iconMap[fileExtension]) {iconSrc = iconMap[fileExtension];}}

        htmlStrings.push(`<li><a href="${itemLink}"><img src="${iconSrc}" alt="${item.name} icon"> ${item.name}</a></li>`);
    }

    document.getElementById('droid-directory').innerHTML = `<ul>${htmlStrings.join('')}</ul>`;}
    catch (error) { console.error('Error fetching repository contents:', error); document.getElementById('droid-directory').innerHTML = `<p>Failed to load repository contents. Error: ${error.message}</p>`;}})();