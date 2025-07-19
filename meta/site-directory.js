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
        'apk': '/meta/dir-apk.webp',
        'css': '/meta/dir-css.webp',
        'ttf': '/meta/dir-font.webp',
        'psd': '/meta/dir-image-editable.webp',
        'svg': '/meta/dir-image-editable.webp',
        'gif': '/meta/dir-image.webp',
        'ico': '/meta/dir-image.webp',
        'js': '/meta/dir-javascript.webp',
        'mp3': '/meta/dir-sound.webp',
        'txt': '/meta/dir-text.webp',
        'md': '/meta/dir-text.webp',
        'webm': '/meta/dir-video.webp',
        'webp': '/meta/dir-image.webp',
        'zip': '/meta/dir-zip.webp',
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
        const previousIcon = '/meta/dir-previous.webp'; 
        const parentHref = parentLink === '' ? '/' : `/${parentLink}/`;
        htmlStrings.push(`<li><a href="${parentHref}"><img src="${previousIcon}" alt="parent directory"> ..</a></li>`);
    }

    for (const item of data) {
        let iconSrc = '/meta/dir-unknown.webp';
        let itemLink = `/${item.path}`; 

        if (item.type === 'dir') {
        iconSrc = '/meta/dir-previous.webp'; 
        itemLink = `/${item.path}/`;} else {
        const fileExtension = item.name.split('.').pop().toLowerCase();
        if (iconMap[fileExtension]) {iconSrc = iconMap[fileExtension];}}

        htmlStrings.push(`<li><a href="${itemLink}"><img src="${iconSrc}" alt="${item.name} icon"> ${item.name}</a></li>`);
    }

    document.getElementById('droid-directory').innerHTML = `<ul>${htmlStrings.join('')}</ul>`;}
    catch (error) { console.error('Error fetching repository contents:', error); document.getElementById('droid-directory').innerHTML = `<p>Failed to load repository contents. Error: ${error.message}</p>`;}})();