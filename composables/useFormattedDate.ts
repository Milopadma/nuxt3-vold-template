export function useFormattedDate(dateString: string) {
  const formattedDate = computed(() => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  return formattedDate;
}
