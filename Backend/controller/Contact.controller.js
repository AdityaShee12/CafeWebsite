import Contact from "../models/Contact.model.js";
import { transporter } from "../config/mailer.js";

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!message) missingFields.push('message');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Please enter ${missingFields.length} missing input(s): ${missingFields.join(', ')}` 
      });
    }

    // Construct the "SMS" equivalent email format as requested 
    const mailOptions = {
      from: `"Aroma Cafe" <${process.env.EMAIL_USER || "sheeaditya12@gmail.com"}>`,
      to: "sheeaditya12@gmail.com",
      replyTo: email,
      subject: subject ? `New Contact SMS: ${subject}` : `New Contact SMS from ${name}`,
      text: `You have received a new SMS/Message from ${name} (${email}):\n\n${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const markContactRead = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }

    contact.isRead = true;
    await contact.save();
    
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
  
      await contact.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
