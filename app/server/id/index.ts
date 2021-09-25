import ciud from "cuid";

const Id = Object.freeze({
    makeId: ciud,
    isValidId: ciud.isCuid
});

export default Id;