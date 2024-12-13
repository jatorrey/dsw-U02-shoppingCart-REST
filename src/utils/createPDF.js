// const puppeteer = require('puppeteer');
const pdf = require('html-pdf');
const bucket = require('../apis/firebaseConfig');

const generateCartPdf = async (email, name, cartDetails) => {
    const { productos, subtotal, iva, total } = cartDetails;

    // Obtener la fecha y hora actual
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = today.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Formato para el nombre del archivo con fecha y hora
    const fileName = `carrito_${name}_${formattedDate.replace(/ /g, "_").replace(/,/g, "")}_${formattedTime.replace(/:/g, "-")}.pdf`;

    // Contenido HTML para el PDF
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #27AE60; font-size: 28px; text-align: center;">Gracias por tu compra, ${name}!</h1>
            <p style="text-align: center; font-size: 16px; color: #2C3E50;">Fecha: ${formattedDate} | Hora: ${formattedTime}</p>

            <h2 style="font-size: 20px; margin-top: 20px; color: #2C3E50;">Detalles del carrito:</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2; text-align: left; font-size: 16px; color: #2C3E50;">Producto</th>
                        <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2; text-align: center; font-size: 16px; color: #2C3E50;">Cantidad</th>
                        <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2; text-align: right; font-size: 16px; color: #2C3E50;">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${productos
            .map(
                (p) => `
                            <tr>
                                <td style="padding: 8px; border: 1px solid #ddd; text-align: left; font-size: 16px; color: #2C3E50;">${p.producto.name}</td>
                                <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 16px; color: #2C3E50;">${p.cantidad}</td>
                                <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-size: 16px; color: #2C3E50;">$${p.producto.price.toFixed(2)}</td>
                            </tr>`
            )
            .join('')}
                </tbody>
            </table>

            <div style="margin-top: 20px;">
                <p style="font-size: 16px; margin-top: 10px; color: #2C3E50;"><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                <p style="font-size: 16px; color: #2C3E50;"><strong>IVA:</strong> $${iva.toFixed(2)}</p>
            </div>

            <!-- Monto total con estilo destacado -->
            <div style="border: 2px solid #27AE60; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px; color: #27AE60; background-color: white; border-radius: 5px;">
                <strong>Total:</strong> $${total.toFixed(2)}
            </div>

            <p style="font-size: 16px; text-align: center; margin-top: 20px; color: #2C3E50;">¡Esperamos que vuelvas pronto! 😊</p>
            <p style="font-size: 14px; text-align: center; color: #777;">
                Si tienes alguna duda, no dudes en <a href="mailto:support@tutienda.com" style="color: #27AE60;">contactarnos</a>.
            </p>
        </div>
    `;

    // Crear una nueva promesa para manejar la operación asíncrona correctamente
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4', margin: { top: "10mm", right: "20mm", bottom: "20mm", left: "20mm" } }).toBuffer(async (err, buffer) => {
            if (err) {
                console.error('Error al generar el PDF:', err);
                reject(new Error('Error al generar el PDF'));
                return;
            }

            // Subir el buffer a Firebase Storage
            const file = bucket.file(`carritos/${fileName}`);
            await file.save(buffer, {
                metadata: {
                    contentType: 'application/pdf',
                },
            });

            // Obtener el enlace público
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2030', // Fecha de expiración
            });

            resolve(url); // Resuelve la promesa con la URL del archivo en Firebase
        });
    });
}

module.exports = { generateCartPdf };
