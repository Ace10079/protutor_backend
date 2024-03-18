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
    email,
    address,
    phone
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
        email,
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
    fname,
    plan_name,
    plancost,
    status,
    tnx_id,
    date,
    count,
    email,
    address,phone
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

      const { date, plancost, fname, tnx_id, count, plan_name, email,address } =
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>invoice</title>
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
              margin: 20px;
            }
      
            .logo {
              height: 160px;
              padding-bottom: 0;
              margin-bottom: 0;
            }
      
            .title {
              margin-top: -20px;
              padding-left: 20px;
            }
      
            .amounts {
              display: flex;
              justify-content: space-between;
              text-align: center;
              padding-top: 20px;
            }
      
            .total-amount {
              font-size: xx-large;
              margin-top: 15px;
            }
      
            .address {
              display: flex;
              gap: 10px;
              padding: 30px;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
            }
      
            .ad-data {
              line-height: 22px;
              font-size: 16px;
            }
      
            .ac-data {
              line-height: 22px;
              font-size: 16px;
              margin-top: 40px;
            }
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
              left: 310px;
              top: 60px;
              font-size: 16px;
            }
      
            .body-values {
              width: 100%;
              margin: 30px;
            }
      
            .values {
              display: grid;
              text-align: center;
              padding: 10px;
            }
      
            .value {
              padding-top: 120px;
            }
      
            .bold {
              font-weight: bolder;
            }
      
            .item1 {
              grid-column-start: 1;
              grid-column-end: 2;
            }
      
            .item2 {
              grid-column-start: 2;
              grid-column-end: 5;
            }
      
            .item3 {
              grid-column-start: 5;
              grid-column-end: 7;
            }
      
            .item6 {
              grid-column-start: 6;
              grid-column-end: 7;
            }
      
            .item7 {
              grid-column-start: 9;
              grid-column-end: 11;
            }
      
            .item4 {
              grid-column-start: 7;
              grid-column-end: 9;
            }
      
            .item5 {
              grid-column-start: 9;
              grid-column-end: 11;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-box"></div>
            <div class="invoice">
              <div class="content">
                <div class="content-left">
                  <img src="Protutor_Logo.png" alt="Pro-tutor logo" class="logo" />
                  <h3 class="title">SST Invoice</h3>
                </div>
      
                <div class="content-right">
                  <p>
                    <b> PRO TUTOR EDUCATIONPRO TUTOR EDUCATION </b>
                    <br />
                    D-3-15, Jalan Tokoh 25/28, Seksyen 25,
                    <br />
                    40400 Shah Alam, Selangor <br />
                    protutoreducation@gmail.com
                  </p>
                </div>
              </div>
              <hr />
      
              <div class="address">
                <div>
                  <p class="ad-data">
                    <b>Bill</b> <br />
                    {userData.fname}
                    <br />
                    Wilayah Persekutuan,Malasiya -55100 <br />
                    {userData.email}
                  </p>
                </div>
                <div>
                  <p class="ad-data">
                    <b>Invoice #</b>
                    <br />
                    {userData.sub_id} <br />
                    <b>Date</b> <br />
                    {userData.date}
                  </p>
                </div>
              </div>
              <hr />
      
              <table class="body-values">
                <tbody class="table-values">
                  <tr class="values">
                    <td class="item1 bold">S.NO</td>
                    <td class="item2 bold">Description</td>
                    <td class="item3 bold">Unit Price</td>
                    <td class="item4 bold">Qty</td>
                    <td class="item5 bold">AMOUNT</td>
                  </tr>
                  <tr class="values">
                    <td class="item1">1</td>
                    <td class="item2">Gold Plan</td>
                    <td class="item3">RM55.00</td>
                    <td class="item4">1</td>
                    <td class="item5">RM55.00</td>
                  </tr>
      
                  <tr class="values value bold">
                    <td class="item6" style="padding-left: 60px">Sub Total</td>
      
                    <td class="item7" style="padding-left: 50px">RM55.00</td>
                  </tr>
                  <tr class="values bold">
                    <td class="item6" style="padding-left: 60px">SST( 8% )</td>
      
                    <td class="item7" style="padding-left: 50px">RM55.00</td>
                  </tr>
                </tbody>
              </table>
              <hr />
      
              <div class="amounts">
                <div>
                  <p>
                    <b>Total Amount in Words:</b> {convertNumberToWords(116.82)}
                    ringgits only /-
                  </p>
                </div>
                <div class="total-amount">RM{totalPrice}</div>
              </div>
      
              <div class="ac-data">
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
      
            <div class="footer">
              <h2 class="foot-title">protutoreducation@gmail.com</h2>
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
