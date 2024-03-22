const ParentPlanModel = require("../model/subscriptionparent_model");
const IdcodeServices = require("./idcode_service");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");


class ParentPlanServices {
  static async registerParentPlan(
    parent_id,
    email,
    fname,
    plan_name,
    plancost,
    status,
    tnx_id,
    date,
    count,
    address,
    phone
  ) {
    try {
      var sub_id = await IdcodeServices.generateCode("ParentPlan");
      const createUser = new ParentPlanModel({
        sub_id,
        parent_id,
        email,
        fname,
        plan_name,
        plancost,
        status,
        tnx_id,
        date,
        count,
        address,
        phone
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async updateParentPlan(
    sub_id,
    parent_id,
    email,
    fname,
    plan_name,
    plancost,
    status,
    tnx_id,
    date,
    count,
    address,phone
  ) {
    try {
      var query = { sub_id: sub_id };
      var values = {
        $set: {
          parent_id: parent_id,
          email : email,
          fname: fname,
          plan_name: plan_name,
          plancost: plancost,
          status: status,
          tnx_id: tnx_id,
          date: date,
          count: count,
          address:address,
          phone:phone
        },
      };

      return await ParentPlanModel.updateOne(query, values);
    } catch (error) {
      throw error;
    }
  }

  static async deleteParentPlan(sub_id) {
    try {
      var query = { parentsub_id: parentsub_id };
      return await ParentPlanModel.findOneAndDelete(query);
    } catch (error) {
      throw error;
    }
  }

  static async getParentPlan(sub_id) {
    try {
      return await ParentPlanModel.findOne({ sub_id });
    } catch (error) {
      throw error;
    }
  }

  static async getid(plan_name) {
    try {
      return await ParentPlanModel.findOne({ plan_name });
    } catch (error) {
      throw error;
    }
  }

  static async get() {
    try {
      return await ParentPlanModel.find();
    } catch (error) {
      throw error;
    }
  }

  static async getPLAN(parent_id) {
    try {
      return await ParentPlanModel.findOne({ parent_id });
    } catch (error) {
      throw error;
    }
  }

  // static async sendOTPEmail(sub_id) {
  //   try {
  //     // Retrieve parent plan details based on sub_id

  //     function convertNumberToWords(number) {
  //       const ones = [
  //         "",
  //         "One",
  //         "Two",
  //         "Three",
  //         "Four",
  //         "Five",
  //         "Six",
  //         "Seven",
  //         "Eight",
  //         "Nine",
  //       ];
  //       const teens = [
  //         "Ten",
  //         "Eleven",
  //         "Twelve",
  //         "Thirteen",
  //         "Fourteen",
  //         "Fifteen",
  //         "Sixteen",
  //         "Seventeen",
  //         "Eighteen",
  //         "Nineteen",
  //       ];
  //       const tens = [
  //         "",
  //         "",
  //         "Twenty",
  //         "Thirty",
  //         "Forty",
  //         "Fifty",
  //         "Sixty",
  //         "Seventy",
  //         "Eighty",
  //         "Ninety",
  //       ];

  //       if (number === 0) return "zero";
  //       if (number < 10) return ones[number];
  //       if (number < 20) return teens[number - 10];
  //       if (number < 100)
  //         return (
  //           tens[Math.floor(number / 10)] +
  //           (number % 10 !== 0 ? " " + ones[number % 10] : "")
  //         );
  //       if (number < 1000)
  //         return (
  //           ones[Math.floor(number / 100)] +
  //           " hundred" +
  //           (number % 100 !== 0 ? " " + convertNumberToWords(number % 100) : "")
  //         );
  //       if (number < 1000000)
  //         return (
  //           convertNumberToWords(Math.floor(number / 1000)) +
  //           " thousand" +
  //           (number % 1000 !== 0
  //             ? " " + convertNumberToWords(number % 1000)
  //             : "")
  //         );
  //       if (number < 1000000000)
  //         return (
  //           convertNumberToWords(Math.floor(number / 1000000)) +
  //           " million" +
  //           (number % 1000000 !== 0
  //             ? " " + convertNumberToWords(number % 1000000)
  //             : "")
  //         );
  //       return "number too large";
  //     }
  //     const parentPlan = await ParentPlanServices.getParentPlan(sub_id);

  //     const { date, plancost, fname, tnx_id, count, plan_name, email,address } =
  //       parentPlan;

  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       host: "smtp.gmail.com",
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: "rdkumar881@gmail.com",
  //         pass: "nghs pjoy vujy irte",
  //       },
  //     });

  //     const mailOptions = {
  //       from: "rdkumar881@gmail.com",
  //       to: `${email}`,
  //       subject: "Your Protutor invoice",
  //       text: `Hi,\n\nFind your invoice attached below.test2`,
  //     };

  //     // Create a PDF from HTML element with dynamically filled values
  //     const pdfContent = `
     
  //      `;

  //     const pdfBuffer = await new Promise((resolve, reject) => {
  //       pdf.create(pdfContent).toBuffer((err, buffer) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(buffer);
  //         }
  //       });
  //     });

  //     // Attach PDF to email
  //     mailOptions.attachments = [
  //       {
  //         filename: "invoice.pdf",
  //         content: pdfBuffer,
  //         contentType: "application/pdf",
  //       },
  //     ];

  //     const info = await transporter.sendMail(mailOptions);
  //     console.log(
  //       "Email sent with OTP and invoice successfully:",
  //       info.response
  //     );
  //     return true;
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     throw new Error("Error sending email");
  //   }
  // }
}
module.exports = ParentPlanServices;
