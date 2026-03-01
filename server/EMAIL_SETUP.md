# Email Notification Setup Guide

## ✅ What's Implemented:

1. **Appointment Confirmation Email** - Sent immediately after booking
2. **Appointment Reminder Email** - Sent 30 minutes before appointment time
3. **Automatic Email Service** - Runs every 5 minutes to check for upcoming appointments

---

## 🔧 Setup Instructions:

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "SmartHospital"
   - Copy the 16-character password

3. **Update `.env` file:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (the 16-char app password)
   ```

4. **Restart the server**

---

### Option 2: SendGrid (Recommended for Production)

1. Sign up at: https://sendgrid.com (Free: 100 emails/day)
2. Get API Key from Settings → API Keys
3. Install: `npm install @sendgrid/mail`
4. Update `emailService.js` to use SendGrid

---

### Option 3: Resend (Modern & Simple)

1. Sign up at: https://resend.com (Free: 100 emails/day)
2. Get API Key
3. Install: `npm install resend`
4. Update `emailService.js` to use Resend

---

## 📧 Email Features:

### Confirmation Email (Sent on Booking):
- ✅ Appointment details
- ✅ Doctor & Department info
- ✅ Date & Time slot
- ✅ Queue position
- ✅ Professional HTML template

### Reminder Email (30 min before):
- ✅ Sent automatically
- ✅ Arrival time reminder
- ✅ All appointment details
- ✅ Queue information

---

## 🧪 Testing:

1. Book an appointment for 30 minutes from now
2. Wait for the reminder service to run (every 5 minutes)
3. Check your email inbox

---

## ⚙️ Configuration:

**Reminder Timing:** Edit `emailReminderService.js` line 9
```javascript
const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);
// Change 30 to any number of minutes
```

**Email Frequency:** Edit `emailReminderService.js` line 4
```javascript
cron.schedule('*/5 * * * *', async () => {
// */5 = every 5 minutes
// */10 = every 10 minutes
// 0 * * * * = every hour
```

---

## 🚀 Production Tips:

1. Use SendGrid or AWS SES for production
2. Add email templates in separate files
3. Implement email queue (Bull/Redis)
4. Add unsubscribe links
5. Track email delivery status
6. Add SMS notifications (Twilio)

---

## 📱 Alternative: SMS Notifications

For SMS reminders, use **Twilio**:
- Sign up: https://www.twilio.com
- Free trial: $15 credit
- 10,000+ SMS/month on paid plans
- Easy integration with Node.js
