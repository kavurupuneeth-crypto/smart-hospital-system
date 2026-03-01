# 📱 Twilio WhatsApp Integration Setup Guide

## Step 1: Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up (get $15 free credit)
3. Verify your email and phone number

## Step 2: Get Credentials

### For Testing (WhatsApp Sandbox - FREE):
1. Go to Twilio Console: https://console.twilio.com
2. Navigate to: **Messaging** → **Try it out** → **Send a WhatsApp message**
3. You'll see:
   - **Sandbox Number**: `whatsapp:+14155238886` (or similar)
   - **Join Code**: Something like "join <code>"

4. Copy these credentials:
   - **Account SID**: Found on dashboard (starts with AC...)
   - **Auth Token**: Click "Show" to reveal

### For Production (Requires Business Verification):
1. Go to **Messaging** → **Senders** → **WhatsApp senders**
2. Apply for WhatsApp Business API access
3. Complete business verification (takes 1-3 days)

## Step 3: Update .env File

Replace these values in `server/.env`:

```env
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## Step 4: Join WhatsApp Sandbox (For Testing)

**Important**: Each patient phone number must join the sandbox first!

1. Save Twilio's sandbox number in your phone: `+1 415 523 8886`
2. Send WhatsApp message: `join <your-code>` (e.g., "join happy-tiger")
3. You'll receive confirmation message
4. Now that number can receive messages from your app!

## Step 5: Configure Webhook

1. In Twilio Console, go to: **Messaging** → **Settings** → **WhatsApp sandbox settings**
2. Under "WHEN A MESSAGE COMES IN":
   - Enter: `https://your-server-url.com/api/whatsapp/webhook`
   - Method: POST
3. Click **Save**

### For Local Testing (Use ngrok):
```bash
# Install ngrok
npm install -g ngrok

# Run ngrok
ngrok http 5000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Use: https://abc123.ngrok.io/api/whatsapp/webhook
```

## Step 6: Test the Integration

### Test 1: Send Manual WhatsApp
```bash
# In your server directory
node -e "
const { sendAppointmentReminder } = require('./utils/whatsappService');
sendAppointmentReminder(
  '+919876543210',  // Your phone number
  'Test Patient',
  'Dr. Sarah Johnson',
  '10:00 AM',
  'test123'
);
"
```

### Test 2: Reply with YES
1. You'll receive WhatsApp message
2. Reply: **YES**
3. System will auto check-in your appointment

## How It Works

### 1. Appointment Reminder (30 mins before)
```
🏥 Hospital Reminder

Hi John Doe,

Your appointment with Dr. Sarah Johnson is in 30 minutes at 10:00 AM.

Are you at the hospital?

Reply:
✅ YES - I'm here
❌ NO - Running late
```

### 2. Patient Replies "YES"
- System automatically checks them in
- Sends confirmation message

### 3. Confirmation Message
```
✅ Check-in Confirmed

Thank you John Doe!

You've been checked in for your appointment with Dr. Sarah Johnson.

Please wait in the reception area. You'll be called shortly.
```

## Troubleshooting

### Error: "Authentication Error"
- Check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are correct
- Make sure no extra spaces in .env file

### Error: "Phone number not verified"
- In trial mode, add phone numbers in Twilio Console → Phone Numbers → Verified Caller IDs
- Or use WhatsApp Sandbox (no verification needed)

### Not receiving messages?
- Make sure you joined the sandbox: Send "join <code>" to Twilio number
- Check phone number format: Must include country code (+91 for India)

### Webhook not working?
- Use ngrok for local testing
- Check webhook URL is correct in Twilio Console
- Make sure server is running

## Cost (After Free Trial)

- **WhatsApp Messages**: ~$0.005 per message
- **100 reminders/day** = $0.50/day = $15/month
- **Very affordable for hospital system!**

## Production Checklist

- [ ] Upgrade Twilio account (add payment method)
- [ ] Apply for WhatsApp Business API approval
- [ ] Complete business verification
- [ ] Get approved WhatsApp sender number
- [ ] Update TWILIO_WHATSAPP_NUMBER in .env
- [ ] Configure production webhook URL
- [ ] Test with real patient phone numbers

## Support

- Twilio Docs: https://www.twilio.com/docs/whatsapp
- Twilio Support: https://support.twilio.com
- WhatsApp Business API: https://www.twilio.com/whatsapp

---

**Ready to go! 🚀**

Start your server and the system will automatically send WhatsApp reminders 30 minutes before appointments!
