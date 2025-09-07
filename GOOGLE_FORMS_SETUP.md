# Google Forms Setup for NovaCore Hub

This project now uses Google Forms instead of a backend server to collect student and sponsor applications.

## Setup Instructions

### 1. Create Google Forms

1. Go to [Google Forms](https://forms.google.com)
2. Create two new forms:
   - **Student Application Form**
   - **Sponsor Application Form**

### 2. Configure Student Form

Add the following fields to your student form:

- **First Name** (Short answer, Required)
- **Last Name** (Short answer, Required)
- **Email** (Short answer, Required)
- **Phone** (Short answer, Required)
- **Date of Birth** (Date, Required)
- **Gender** (Multiple choice: Male, Female, Other, Required)
- **Education Level** (Multiple choice: High School, Diploma, Bachelor's, Master's, PhD, Required)
- **Institution** (Short answer, Required)
- **Areas of Interest** (Checkboxes: Web Development, Mobile Development, Data Science, Digital Marketing, UI/UX Design, Cybersecurity, AI/ML, Required)
- **Availability** (Multiple choice: Full-time, Part-time, Weekends only, Required)
- **Motivation** (Paragraph, Required)

### 3. Configure Sponsor Form

Add the following fields to your sponsor form:

- **Organization Name** (Short answer, Required)
- **Contact Person First Name** (Short answer, Required)
- **Contact Person Last Name** (Short answer, Required)
- **Contact Email** (Short answer, Required)
- **Contact Phone** (Short answer, Required)
- **Contact Position** (Short answer, Required)
- **Organization Type** (Multiple choice: Corporation, NGO, Government, Startup, Other, Required)
- **Organization Size** (Multiple choice: 1-10, 11-50, 51-200, 201-1000, 1000+, Required)
- **Industry** (Short answer, Required)
- **Website** (Short answer)
- **Sponsorship Type** (Multiple choice: Financial, Equipment, Mentorship, Training, Other, Required)
- **Duration** (Multiple choice: 3 months, 6 months, 1 year, Ongoing, Required)
- **Areas of Interest** (Checkboxes: Student Training, Equipment Provision, Mentorship, Event Sponsorship, Research Projects, Required)
- **Expectations** (Paragraph, Required)
- **Benefits** (Paragraph, Required)

### 4. Get Form URLs

1. For each form, click the "Send" button
2. Click the link icon to get the form URL
3. Copy the form ID from the URL (the long string after `/d/` and before `/edit`)

### 5. Update index.html

Replace the placeholder URLs in `index.html`:

```html
<!-- Student Form -->
<form id="studentForm" action="https://docs.google.com/forms/d/e/YOUR_STUDENT_FORM_ID/formResponse" method="POST" target="_blank">

<!-- Sponsor Form -->
<form id="sponsorForm" action="https://docs.google.com/forms/d/e/YOUR_SPONSOR_FORM_ID/formResponse" method="POST" target="_blank">
```

Replace `YOUR_STUDENT_FORM_ID` and `YOUR_SPONSOR_FORM_ID` with the actual form IDs from step 4.

### 6. Field Name Mapping

Make sure the `name` attributes in your HTML forms match the field names in Google Forms. The current setup uses these names:

**Student Form:**
- firstName, lastName, email, phone, dateOfBirth, gender
- educationLevel, institution, interests[], availability, motivation

**Sponsor Form:**
- organizationName, contactFirstName, contactLastName, contactEmail, contactPhone, contactPosition
- orgType, orgSize, industry, website, sponsorshipType, duration, sponsorInterests[], expectations, benefits

### 7. Test the Forms

1. Open `index.html` in a web browser
2. Test both student and sponsor applications
3. Verify that submissions are received in your Google Forms

## Benefits of Using Google Forms

- ✅ No server hosting costs
- ✅ Automatic data collection and storage
- ✅ Built-in analytics and responses
- ✅ Email notifications for new submissions
- ✅ Easy data export to spreadsheets
- ✅ No maintenance required

## Notes

- Forms will open in a new tab when submitted
- Users will see Google's confirmation page after submission
- All data is automatically stored in Google Sheets
- You can set up email notifications in Google Forms settings
