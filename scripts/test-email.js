// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { sendWhitepaperEmail, sendInternalNotification } = require('../app/lib/email');

async function testEmail() {
  console.log('🧪 Testing email functionality...');
  
  const testLead = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    role: 'Marketing Manager',
    industry: 'Technology',
    leadId: 'test_' + Date.now(),
  };

  try {
    // Test whitepaper email
    console.log('📧 Sending whitepaper email...');
    const emailResult = await sendWhitepaperEmail(testLead);
    console.log('Whitepaper email result:', emailResult);

    // Test internal notification
    console.log('📬 Sending internal notification...');
    const notificationResult = await sendInternalNotification(testLead);
    console.log('Internal notification result:', notificationResult);

    console.log('✅ Email test completed!');
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmail();
