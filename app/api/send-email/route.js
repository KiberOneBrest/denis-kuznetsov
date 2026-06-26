import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализация Resend с API ключом
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, height, favoriteColor, birthDate, pRankCount } = body;

    // Валидация
    if (!name || !height || !favoriteColor || !birthDate || pRankCount === undefined) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Формирование HTML письма
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            td { padding: 12px; border: 1px solid #e5e7eb; }
            .label { font-weight: bold; background-color: #f3f4f6; width: 40%; }
            .value { width: 60%; }
            .color-box { 
              display: inline-block; 
              width: 20px; 
              height: 20px; 
              border: 1px solid #ccc; 
              vertical-align: middle; 
              margin-right: 8px;
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 2px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🎮 Новая анкета пользователя</h2>
            <table>
              <tr>
                <td class="label">Имя</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">Рост</td>
                <td class="value">${height} см</td>
              </tr>
              <tr>
                <td class="label">Любимый цвет</td>
                <td class="value">
                  <span class="color-box" style="background-color: ${favoriteColor};"></span>
                  ${favoriteColor}
                </td>
              </tr>
              <tr>
                <td class="label">Дата рождения</td>
                <td class="value">${new Date(birthDate).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</td>
              </tr>
              <tr>
                <td class="label">Кол-во P-рангов в ULTRAKILL</td>
                <td class="value">${pRankCount}</td>
              </tr>
            </table>
            <div class="footer">
              <p>📅 Отправлено: ${new Date().toLocaleString('ru-RU')}</p>
              <p>📧 Отправлено через Resend</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Отправка письма через Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL,
      subject: `📝 Новая анкета от ${name}`,
      html: html,
      // Можно добавить текст версию для почтовых клиентов без HTML
      text: `
        Новая анкета пользователя
        
        Имя: ${name}
        Рост: ${height} см
        Любимый цвет: ${favoriteColor}
        Дата рождения: ${new Date(birthDate).toLocaleDateString('ru-RU')}
        Кол-во P-рангов в ULTRAKILL: ${pRankCount}
        
        Отправлено: ${new Date().toLocaleString('ru-RU')}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Ошибка отправки письма' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '✅ Форма успешно отправлена!',
      id: data?.id
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '❌ Ошибка при отправке формы. Попробуйте позже.' },
      { status: 500 }
    );
  }
}