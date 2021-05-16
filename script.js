const state = {
    _tags: [],
    currentTag: "",
    get tags () {
        return this._tags;
    },
    set tags (tags) {
        this._tags = tags;
        localStorage.setItem("tags", JSON.stringify(tags));
    },
    pushTag: () => {
        const tag = { key: generateTempId(), text: document.querySelector('[name="tag-input"]').value };
        const tags = [...state.tags, tag];
        state.tags = tags;
        state.renderElement(tag);
    },
    renderElement: tag => {
        const container = document.querySelector("[name='tag-container']");
        if (container) {
            const div = document.createElement("div");
            const icon = document.createElement("span");
            const text = document.createElement("span");
            div.setAttribute("name", tag.key);
            div.className = "flex justify-between tag"
            icon.innerText = "x";
            icon.className = "close-icon"
            text.innerText = tag.text;
            div.appendChild(icon);
            div.appendChild(text);
            icon.onclick = () => state.removeTag(tag);
            container.appendChild(div);
            document.querySelector('[name="tag-input"]').value = "";
            localStorage.setItem("currentTag", '');
            document.querySelector('[name="tag-input"]').focus();
        }
    },
    removeTag: tag => {
        const index = state.tags.findIndex(item => item.key === tag.key);
        if (index !== -1) {
            const tags = [...state.tags];
            tags.splice(index, 1);
            state.tags = tags;
            const element = document.querySelector(`[name='${tag.key}']`);
            element.parentElement.removeChild(element);
        }
    },
    onChangeInput: e => {
        localStorage.setItem("currentTag", e.target.value);
    },
};

const init = () => {
    state._tags = localStorage.getItem("tags") ? JSON.parse(localStorage.getItem("tags")) : [];
    state.currentTag = localStorage.getItem("currentTag") || "";
    document.querySelector('[name="tag-input"]').value = state.currentTag;
    for (tag of state.tags) {
        state.renderElement(tag);
    }
};

init();


const generateTempId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
