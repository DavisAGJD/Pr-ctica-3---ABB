export function generateISBN() {
    const prefix = "978"; // Prefijo para el sector del libro
    const randomDigits = Array.from({ length: 9 }, () =>
        Math.floor(Math.random() * 10)
    ).join(""); // Generar 9 dígitos aleatorios

    // Combinar prefijo y números generados
    const isbnWithoutCheck = prefix + randomDigits;

    // Calcular el dígito de comprobación
    const checkDigit = calculateCheckDigit(isbnWithoutCheck);

    // Combinar para formar el ISBN completo
    return `${prefix}-${randomDigits.slice(0, 3)}-${randomDigits.slice(
        3,
        6
    )}-${randomDigits.slice(6)}-${checkDigit}`;
}

function calculateCheckDigit(isbnWithoutCheck) {
    const digits = isbnWithoutCheck.split("").map(Number);
    const sum = digits.reduce((acc, digit, index) => {
        return acc + digit * (index % 2 === 0 ? 1 : 3);
    }, 0);
    const remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
}
