const mongoose = require("mongoose");
const { crmsDatabaseConnection } = require("../../../Database/Connection");

const ButtonInputSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "QUICK_REPLY",
      "URL",
      "PHONE_NUMBER",
      "OTP",
      "MPM",
      "CATALOG",
      "FLOW",
      "VOICE_CALL",
      "APP",
    ],
    required: true,
  },
  phone_number: {
    type: String,
    required: function () {
      return this.type === "PHONE_NUMBER";
    },
  },
  url: {
    base_url: {
      type: String,
      required: function () {
        return this.type === "URL";
      },
    },
    url_suffix_example: {
      type: String,
    },
  },
  otp_type: {
    type: String,
    enum: ["COPY_CODE", "ONE_TAP", "ZERO_TAP"],
  },
  zero_tap_terms_accepted: {
    type: Boolean,
  },
  supported_apps: [
    {
      package_name: String,
      signature_hash: String,
    },
  ],
});

const LibraryTemplateBodyInputsSchema = new mongoose.Schema({
  add_contact_number: { type: Boolean },
  add_learn_more_link: { type: Boolean },
  add_security_recommendation: { type: Boolean },
  add_track_package_link: { type: Boolean },
  code_expiration_minutes: { type: Number },
});

const ComponentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["HEADER", "BODY", "FOOTER", "BUTTONS"],
    required: true,
  },
  format: {
    type: String,
    enum: ["TEXT", "IMAGE", "VIDEO", "DOCUMENT"],
  },
  text: {
    type: String,
    required: function () {
      return this.type !== "BUTTONS";
    },
  },
  buttons: [ButtonInputSchema],
});

const WhatsAppTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 512,
  },
  category: {
    type: String,
    enum: ["UTILITY", "MARKETING", "AUTHENTICATION"],
    required: true,
  },
  parameter_format: {
    type: String,
    enum: ["NAMED", "POSITIONAL"],
    default: "POSITIONAL",
  },
  allow_category_change: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    required: true,
  },
  library_template_name: {
    type: String,
  },
  components: {
    type: [ComponentSchema],
    required: true,
  },
  library_template_body_inputs: LibraryTemplateBodyInputsSchema,
});

module.exports = crmsDatabaseConnection.model(
  "Campaign_Whatsapp_Template",
  WhatsAppTemplateSchema
);
