// Este código se ejecuta en el servidor para enviar notificaciones a Discord.

export default async function handler(request, response) {
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1530694070807167138/-Q-2UonsecwpSbO-Jvp5OPTF6_rWlpKz540Wmi3a0VFiG3cUO1OwgPLfDCmpSjoYlchG";

    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    if (!DISCORD_WEBHOOK_URL || !DISCORD_WEBHOOK_URL.startsWith("https://discord.com")) {
        console.error("La URL del Webhook de Discord no es válida.");
        return response.status(500).json({ message: 'Webhook de Discord no configurado en el servidor.' });
    }

    try {
        // El cuerpo de la solicitud ahora puede contener 'content' o 'embeds'.
        // Lo pasamos directamente a Discord.
        const payload = request.body;

        await fetch(DISCORD_WEBHOOK_URL, { 
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) 
        });
        return response.status(200).json({ success: true });

    } catch (error) {
        console.error('Error sending to Discord:', error);
        return response.status(500).json({ message: 'Error interno del servidor al enviar a Discord.' });
    }
}