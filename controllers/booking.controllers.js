// utils/emailService.js
import nodemailer from 'nodemailer';

export const emailService = {
  transporter: null,

  isConfigured() {
    return process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;
  },

  initialize() {
    if (this.isConfigured()) {
      this.transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      console.log('✅ Email service initialized');
    } else {
      console.log('⚠️ Email service not configured');
    }
  },

  async sendBookingConfirmation(booking) {
    if (!this.transporter) {
      throw new Error('Email service not configured');
    }

    try {
      const mailOptions = {
        from: `"QUERCUS OAK STAYS" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: `Booking Confirmation - ${booking.propertyName}`,
        html: this.generateEmailTemplate(booking),
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        channel: 'email',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      throw new Error(`Email failed: ${error.message}`);
    }
  },

  generateEmailTemplate(booking) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #D4AF37; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #D4AF37; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .booking-id { font-size: 18px; font-weight: bold; color: #D4AF37; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>QUERCUS OAK STAYS</h1>
            <h2>Booking Confirmation</h2>
          </div>
          
          <div class="content">
            <p>Dear ${booking.firstName} ${booking.lastName},</p>
            <p>Thank you for choosing QUERCUS OAK STAYS! Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <p class="booking-id">Booking ID: ${booking.bookingId}</p>
              
              <h3>Booking Details</h3>
              <p><strong>Property:</strong> ${booking.propertyName}</p>
              <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> ${booking.guests}</p>
              <p><strong>Nights:</strong> ${booking.nights}</p>
              <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString()}</p>
              ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Our team will contact you within 24 hours</li>
              <li>Please keep this booking ID for reference</li>
              <li>For any queries, call us at +91-9119772488</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>&copy; 2024 QUERCUS OAK STAYS. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};

// Initialize email service
emailService.initialize();