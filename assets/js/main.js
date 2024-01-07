const loreInput = $('#my-input-field');
const displayNameInput = $('#display-name-input');
const lorePreview = $('.preview .lore-container .lore');
const displayNamePreview = $('.preview .displayName-container .display-name');

const colorMap = new Map()
    .set("4", "#AA0000").set("c", "#FF5555")
    .set("6", "#FFAA00")
    .set("e", "#FFFF55")
    .set("2", "#00AA00")
    .set("a", "#55FF55")
    .set("b", "#55FFFF")
    .set("3", "#00AAAA")
    .set("1", "#0000AA")
    .set("9", "#5555FF")
    .set("d", "#FF55FF")
    .set("5", "#AA00AA")
    .set("f", "#FFFFFF")
    .set("7", "#AAAAAA")
    .set("8", "#555555")
    .set("0", "#000000");

function getColorFromCode(code) {
    return colorMap.get(code.toLowerCase()) || '';
}
const colorRegex = /&\w/g;
const regex = /&[^&]+/g;

function updatePreview(event) {
    const loreInputValue = event.target.value.replace(/\\n/g, '\n');

    lorePreview.empty(); // Reset the lore container

    const matches = Array.from(loreInputValue.matchAll(regex), match => match[0]);

    if (matches.length > 0) {
        matches.forEach((value, index) => {
            const colorMatch = value.match(colorRegex);
            let color = (colorMatch ? colorMatch[0].replace("&", "") : getColorFromCode("f"));

            let text = "";
            if (colorMap.has(colorMatch[0].replace("&",""))){
                text = value.replace(colorRegex, "");
            }else{
                text = value;
            }

            text = text.replace(/\n/g, '<br>');

            let span = $('<span>').css('color', getColorFromCode(color)).html(text);
            lorePreview.append(span);
        });
    }else {
        let span = $('<span>').css('color', getColorFromCode("f")).html(loreInputValue);
        lorePreview.append(span);
    }
}

function updateDisplayName(event){
    const displayNameValue = event.target.value;
    displayNamePreview.empty();

    const matches = displayNameValue.match(regex);

    if (!matches){
        let span = $('<span>').css('color', getColorFromCode("f")).html(displayNameValue);
        displayNamePreview.append(span);
        return
    }


    if (matches.length > 0) {
        matches.forEach(match => {
            const colorMatch = match.match(colorRegex)[0];
            let color = (colorMatch ? colorMatch.replace("&","") : getColorFromCode("f"));

            let text = "";
            if (colorMap.has(colorMatch.replace("&",""))){
                text = match.replace(colorRegex, "");
            }else{
                text = match;
            }
            let span = $('<span>').css('color', getColorFromCode(color)).html(text);
            displayNamePreview.append(span);
        });
    }
}

loreInput.on('input', (event) => {
    updatePreview(event);
});

loreInput.on('change', (event) => {
    updatePreview(event);
});

displayNameInput.on('change', (event) => {
    updateDisplayName(event);
});
displayNameInput.on('input', (event) => {
    updateDisplayName(event);
});
