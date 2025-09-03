const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
  permitType: { type: String, enum: ['Business Permit', 'Building Permit', 'Travel Permit', 'Other'], required: true },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  description: { type: String },
  applicationDate: { type: Date, default: Date.now },
  approvalDate: { type: Date },
  expiryDate: { type: Date },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Expired'], default: 'Pending' },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fee: { type: Number },
  filePath: { type: String }, // path to uploaded file
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
permitSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Permit', permitSchema);
