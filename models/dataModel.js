const mongoose = require("mongoose");

const dataModelSchema = new mongoose.Schema({
  patientDetails: {
    patientFirstName: String,
    patientLastName: String,
    age: String,
    sex: String,
    organization: String,
    referral: String,
    sampleId: String,
    sampleType: String,
    dateOfReport: Date,
    source: String,
    action: String,
    email: String,
    phoneNumber: Number,
    address: String,
    pincode: Number,
  },
  measurements: {
    RFT: {
      bloodUreaNitrogenBUN: Number,
      urea: Number,
      uricAcid: Number,
      creatinine: Number,
      ureaCreatinineRatio: Number,
      bunCreatinineRatio: Number,
      calcium: Number,
      sodium: Number,
      potassium: Number,
      chloride: Number,
    },
    LFT: {
      bilirubinTotal: Number,
      bilirubinDirect: Number,
      bilirubinIndirect: Number,
      aspartateAminotransferaseASTSGOT: Number,
      alanineTransaminaseALTSGPT: Number,
      sgotSgptRatio: Number,
      ggtGammaGlutamylTranspeptidase: Number,
      alkalinePhosphataseALPI: Number,
      totalProtein: Number,
      albumin: Number,
      globulin: Number,
      agRatio: Number,
    },
  },
  tests: [
    { testID: Number, testDate: String, package: String, sampleID: Number },
  ],
});

const dataModel = mongoose.model("dataModel", dataModelSchema);

module.exports = dataModel;
