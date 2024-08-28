export function replaceSpacesWithNonBreaking(text: string): string {
    // Replace spaces after single characters with non-breaking spaces
    return text.replace(/(\b\w\b) /g, '$1\u00A0');
}
