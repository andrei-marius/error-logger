const convertToLocalTime = isoString => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.split('.')[0].replace('T', ' ');
    return isoLocal;
};

export default convertToLocalTime;