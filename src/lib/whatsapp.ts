/** Link wa.me com mensagem pré-preenchida. `number`: só dígitos, com indicativo (ex. 351912345678). */
export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
