const TelegramBot = require('node-telegram-bot-api');
const token = '7466305992:AAFSwei1aa7BFOr7iaAc7qp8lNK3utlhKlc';
const bot = new TelegramBot(token, { polling: true });

// 🔧 Chap menyuga komandalarni qo‘shish
bot.setMyCommands([
  { command: "/start", description: "Botni boshlash" },
  { command: "/buyurtma", description: "🚖 Buyurtma berish (Web App)" }
]);

// 🟢 /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Assalomu alaykum, ${msg.from.first_name}!\n Men Muhammadali Web ilovadan buyurtma berish uchun menyudan /buyurtma ni tanlang.`);
});

// 🟢 /buyurtma komandasi — Web App tugmasini chiqaradi
bot.onText(/\/buyurtma/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🚖 Buyurtma yetkazib berish va Taksi bo'yicha Web appni oching:", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "🟢 Web App ni ochish",
          web_app: { url: "https://v0-taksi-order-setup-mbiav-mbiavs-projects.vercel.app" }
        }
      ]]
    }
  });
});

// 🟢 Web App'dan yuborilgan ma'lumotni qabul qilish (ixtiyoriy)
bot.on("web_app_data", (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  const text = `
✅ Yangi buyurtma:
🧾 Xizmat: ${data.xizmat}
👤 Ism: ${data.ism}
📞 Tel: ${data.telefon}
📍 Manzil: ${data.manzil}
  `;
  bot.sendMessage(msg.chat.id, text);
});
