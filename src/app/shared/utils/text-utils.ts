export function selectText(event: FocusEvent | KeyboardEvent) {
  setTimeout(() => {
    (event.target as HTMLInputElement).select();
  }, 0);
}

export function clearInput(event: FocusEvent | KeyboardEvent) {
  setTimeout(() => {
    (event.target as HTMLInputElement).value = ''; // Clear input field
  }, 0);
}
