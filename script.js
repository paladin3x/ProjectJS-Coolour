const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space')
        setRandomColor();
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'lock') {
        const node = event.target.tagName === 'I'
            ? event.target
            : event.target.children[0];
            
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (event.target.dataset.type === 'copy') {
        copyTextClickBoard(event.target.textContent)
    }
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setRandomColor(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const textCols = col.querySelector('h2');
        const button = col.querySelector('button');
      
        if (isLocked) {
            colors.push(textCols.textContent)
            return;
        }

        const color = isInitial
            ? colors[index] 
                ? colors[index]
                : getRandomHexColor()
            : getRandomHexColor()
        
        if (!isInitial) {
            colors.push(color)
        }
        textCols.textContent = color;
        col.style.background = color;
    
        setTextColor(textCols, color);
        setTextColor(button, color);

    })

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyTextClickBoard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        }).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => "#" + color)
    }
    return []
}

setRandomColor(true)

