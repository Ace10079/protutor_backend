const ParentPlanModel = require("../model/subscriptionparent_model");
const IdcodeServices = require("./idcode_service");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");

class ParentPlanServices {
  static async registerParentPlan(
    parent_id,
    fname,
    plan_name,
    plancost,
    status,
    tnx_id,
    date,
    count,
    email
  ) {
    try {
      var sub_id = await IdcodeServices.generateCode("ParentPlan");
      const createUser = new ParentPlanModel({
        sub_id,
        parent_id,
        fname,
        plan_name,
        plancost,
        status,
        tnx_id,
        date,
        count,
        email
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async updateParentPlan(
    sub_id,
    parent_id,
    fname,
    plan_name,
    plancost,
    status,
    tnx_id,
    date,
    count,
    email
  ) {
    try {
      var query = { sub_id: sub_id };
      var values = {
        $set: {
          parent_id: parent_id,
          fname: fname,
          plan_name: plan_name,
          plancost: plancost,
          status: status,
          tnx_id: tnx_id,
          date: date,
          count: count,
          email : email,
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

  static async sendOTPEmail(sub_id) {
    try {
      // Retrieve parent plan details based on sub_id

      function convertNumberToWords(number) {
        const ones = [
          "",
          "One",
          "Two",
          "Three",
          "Four",
          "Five",
          "Six",
          "Seven",
          "Eight",
          "Nine",
        ];
        const teens = [
          "Ten",
          "Eleven",
          "Twelve",
          "Thirteen",
          "Fourteen",
          "Fifteen",
          "Sixteen",
          "Seventeen",
          "Eighteen",
          "Nineteen",
        ];
        const tens = [
          "",
          "",
          "Twenty",
          "Thirty",
          "Forty",
          "Fifty",
          "Sixty",
          "Seventy",
          "Eighty",
          "Ninety",
        ];

        if (number === 0) return "zero";
        if (number < 10) return ones[number];
        if (number < 20) return teens[number - 10];
        if (number < 100)
          return (
            tens[Math.floor(number / 10)] +
            (number % 10 !== 0 ? " " + ones[number % 10] : "")
          );
        if (number < 1000)
          return (
            ones[Math.floor(number / 100)] +
            " hundred" +
            (number % 100 !== 0 ? " " + convertNumberToWords(number % 100) : "")
          );
        if (number < 1000000)
          return (
            convertNumberToWords(Math.floor(number / 1000)) +
            " thousand" +
            (number % 1000 !== 0
              ? " " + convertNumberToWords(number % 1000)
              : "")
          );
        if (number < 1000000000)
          return (
            convertNumberToWords(Math.floor(number / 1000000)) +
            " million" +
            (number % 1000000 !== 0
              ? " " + convertNumberToWords(number % 1000000)
              : "")
          );
        return "number too large";
      }
      const parentPlan = await ParentPlanServices.getParentPlan(sub_id);

      const { date, plancost, fname, tnx_id, count, plan_name, email } =
        parentPlan;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "rdkumar881@gmail.com",
          pass: "tgva evuh sshs tqfd",
        },
      });

      const mailOptions = {
        from: "rdkumar881@gmail.com",
        to: `${email}`,
        subject: "Your Protutor invoice",
        text: `Hi,\n\nFind your invoice attached below.test2`,
      };

      // Create a PDF from HTML element with dynamically filled values
      const pdfContent = `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="widtd=device-widtd, initial-scale=1.0" />
    <title>Invoice</title>
    
    <style>
      .invoice-container {
        max-width: 890px;
        margin: 1px auto;
        border-radius: 5px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        line-height: 10px;
        font-family: "Open Sans", "Helvetica Neue", sans-serif;
        color: #555;
      }

      .invoice-box {
        height: 50px;
        width: 100%;
        background-color: rgb(26, 84, 65);
      }
      .invoice {
        padding: 30px;
      }

      .content {
        display: flex;
        gap: 2px;
        padding: 20px;
        margin-top: -40px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .content-left {
        margin-left: 40px;
        align-items: center;
      }

      .logo {
        height: 160px;
        padding-bottom: 0;
        margin-bottom: 0;
      }

      .title {
        margin-top: -20px;
        padding-left: 0px;
      }

      .table {
        margin: 20px;
        width: 100%;
      }

      .heading {
        font-weight: 1000;
      }

      .values {
        display: flex;
        justify-content: space-between;
        gap: 25px;
        align-items: center;
      }

      .amount {
        display: flex;
        gap: 20px;
        align-items: center;
        font-size: 18px;
      }
      .total-amount {
        font-size: xx-large;
      }
      .gst {
        padding-top: 10px;
        font-weight: 700;
      }

      .sub {
        padding-top: 180px;
        font-weight: 700;
      }

      .data {
        padding-top: 20px;
        align-items: center;
      }

      td {
        text-align: center;
      }

      .address {
        display: flex;
        gap: 10px;
        padding: 30px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .ad-data,
      .content-right {
        line-height: 22px;
        font-size: 16px;
      }

      .footer {
        position: relative;
        height: 160px;
        width: 100%;
        background-color: rgba(26, 84, 65);
        color: white;
      }

      .foot-title {
        position: absolute;
        left: 350px;
        top: 60px;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <!-- Head -->
      <div class="invoice-box"></div>

      <div class="invoice">
        <!-- content -->
        <div class="content">
          <!-- left -->
          <div class="content-left">
            <img src="Protutor_Logo.png" alt="Pro-tutor logo" class="logo" />
            <h1 class="title">SST Invoice</h1>
          </div>
          <!-- right -->
          <div class="content-right">
            <p style="text-align: right">
              <b> PRO TUTOR EDUCATIONPRO TUTOR EDUCATION </b><br />
              D-3-15, Jalan Tokoh 25/28, Seksyen 25,<br />
              40400 Shah Alam, Selangor <br />
              protutoreducation@gmail.com
            </p>
          </div>
        </div>
        <hr />
        <!-- Address -->
        <div class="address">
          <div>
            <h4 class="ad-head">Bill</h4>
            <p class="ad-data">
              Aswab<br />
              Wilayah Persekutuan,Malasiya -55100 <br />
              admin@hmail.com
            </p>
          </div>
          <div>
            <p class="ad-data">
              <b>Invoice #</b><br />
              Code0000 <br />
              <b>Date</b> <br />
              23/23/3/4
            </p>
          </div>
        </div>
        <hr />
        <!-- table -->
        <table class="table">
          <tbody>
            <tr class="heading">
              <td>S.NO</td>
              <td>Description</td>
              <td>Unit Price</td>
              <td>Qty</td>
              <td>AMOUNT</td>
            </tr>
            <tr>
              <td class="data">1</td>
              <td class="data">Gold Plan</td>
              <td class="data">RM50.00</td>
              <td class="data">1</td>
              <td class="data">RM50.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="sub">Sub Total</td>
              <td></td>
              <td class="sub">RM50.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="gst">SST( 8% )</td>
              <td></td>
              <td class="gst">RM04.00</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <!-- values -->
        <div class="values">
          <div class="amount">
            <p><b>Total Amount in Words:</b></p>
            <p>Fifty-Four ringgits only /-</p>
          </div>
          <div class="total-amount">RM54.00</div>
        </div>
        <!-- Account details -->
        <div class="ad-data">
          <p>
            <b>Acc Details:</b>
            <br />
            Acc no. : 000000000000 <br />
            Acc Name: Protutor Education <br />
            IFSC Code : ABC0000123
            <br />
            Branch: Malasiya
          </p>
        </div>
      </div>

      <!-- footer -->

      <div class="footer">
        <h2 class="foot-title">www.protutoreducation.com</h2>
      </div>
    </div>
  </body>
</html>

            `;

      const pdfBuffer = await new Promise((resolve, reject) => {
        pdf.create(pdfContent).toBuffer((err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });

      // Attach PDF to email
      mailOptions.attachments = [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ];

      const info = await transporter.sendMail(mailOptions);
      console.log(
        "Email sent with OTP and invoice successfully:",
        info.response
      );
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email");
    }
  }
}
module.exports = ParentPlanServices;
