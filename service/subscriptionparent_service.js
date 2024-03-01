const ParentPlanModel =require('../model/subscriptionparent_model')
const IdcodeServices = require("./idcode_service");
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');


class ParentPlanServices{
    static async registerParentPlan(parent_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try{
            var sub_id = await IdcodeServices.generateCode("ParentPlan");
            const createUser = new ParentPlanModel({sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateParentPlan(sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try {
            var query = {sub_id :sub_id};
            var values = {$set : {parent_id : parent_id,fname : fname,plan_name : plan_name,plancost : plancost,status : status,tnx_id : tnx_id,date : date,count:count}};
            
            return await ParentPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteParentPlan(sub_id){
        try{
            var query = {parentsub_id : parentsub_id};
            return await ParentPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getParentPlan(sub_id){
        try {
            
            return await ParentPlanModel.findOne({sub_id})
        } catch (error) {
            throw error
        }
    }

    static async getid(plan_name){
        try {
            
            return await ParentPlanModel.findOne({plan_name})
        } catch (error) {
            throw error
        }
    }

    static async get(){
        try {
            return await ParentPlanModel.find();
        } catch (error) {
            throw error
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
                    (number % 1000 !== 0 ? " " + convertNumberToWords(number % 1000) : "")
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
    
            const { date, plancost, fname, tnx_id, count, plan_name,email} = parentPlan;
    
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'rdkumar881@gmail.com',
                    pass: 'tgva evuh sshs tqfd',
                },
            });
    
            const mailOptions = {
                from: 'rdkumar881@gmail.com',
                to: "rdineshkumar200400@gmail.com",
                subject: 'Your Protutot invoice',
                text: `Hi,\n\nFind your invoice attached below.`,
            };
    
            // Create a PDF from HTML element with dynamically filled values
            const pdfContent = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax Invoice</title>
    <style>
        .top_rw{ background-color:#f4f4f4; }
	.td_w{ }
	button{ padding:5px 10px; font-size:14px;}
    .invoice-box {
        max-width: 890px;
        margin: auto;
        padding:30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 14px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
		border-bottom: solid 1px #ccc;
    }
    .invoice-box table td {
        padding: 5px;
        vertical-align:middle;
    }
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
		font-size:12px;
    }
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    .rtl table {
        text-align: right;
    }
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>
<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top_rw">
                <td colspan="2">
                    <h2 style="margin-bottom: 0px;">Purchase invoice/Bill of Supply</h2>
                    <span>Number: 27B00032991LQ354 Date: ${date}</span>
                </td>
                <td style="width:30%; margin-right: 10px;">
                     Order Id: ${tnx_id}
                </td>
            </tr>
            <tr class="top">
                <td colspan="3">
                    <table>
                        <tr>
                            <td>
                                <b>Sold By: Pro Tutor</b><br>
                                Delhivery Pvt. Ltd. Plot No. A5 Indian Corporation<br>
                                Warehouse Park Village Dive-anjur, Bhiwandi, Off<br>
                                Nh-3, Near Mankoli Naka, District Thane, Pin Code : 421302<br>
                                Mumbai, Maharashtra - 421302<br>
                                PAN: AALFN0535C<br>
                                GSTIN: 27AALFN0535C1ZK<br>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="3">
                    <table>
                        <tr>
                            <td colspan="2">
                                <b>Invoice From: w3learnpoint</b><br>
                                Kokar, Ranchi<br>
                                +0651-908-090-009<br>
                                info@w3learnpoint.com<br>
                                www.w3learnpoint.com
                            </td>
                            <td>
                                <b>Invoice To: ${fname}</b><br>
                                Acme Corp.<br>
                                John Doe<br>
                                ${email}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <td colspan="3">
                <table cellspacing="0px" cellpadding="2px">
                    <tr class="heading">
                        <td style="width:25%;">
                            SUBSCRIPTION PLAN
                        </td>
                        <td style="width:10%; text-align:center;">
                            CREDITS
                        </td>
                        <td style="width:10%; text-align:right;">
                           TNX ID
                        </td>
                        <td style="width:15%; text-align:right;">
                        PRICE 
                        </td>
                       
                        <td style="width:15%; text-align:right;">
                            TOTAL AMOUNT (INR)
                        </td>
                    </tr>
                    <tr class="item">
                        <td style="width:25%;">
                            ${plan_name} plan
                        </td>
                        <td style="width:10%; text-align:center;">
                            ${count}
                        </td>
                        <td style="width:10%; text-align:right;">
                           ${tnx_id}
                        </td>
                        <td style="width:15%; text-align:right;">
                           $ ${plancost}
                        </td>
                        <td style="width:15%; text-align:right;">
                            $ ${plancost}
                        </td>
                       
                    </tr>
                    <tr class="item">
                        <td style="width:25%;"><b>Grand Total</b></td>
                        <td style="width:10%; text-align:center;">${count}</td>
                        <td style="width:10%; text-align:right;"></td>
                        <td style="width:15%; text-align:right;"></td>
                        
                        <td style="width:15%; text-align:right;"><b>$ ${plancost}</b></td>
                    </tr>
                </table>
            </td>
            <tr class="total">
                <td colspan="3" align="right">Total Amount in Words: <b>${convertNumberToWords(plancost)} dollars Only</b></td>
            </tr>
            <tr>
                <td colspan="3">
                    <table cellspacing="0px" cellpadding="2px">
                        <tr>
                            <td width="50%">
                                <b>Declaration:</b><br>
                                We declare that this invoice shows the actual price of the goods described above and that all particulars are true and correct. The goods sold are intended for end user consumption and not for resale.
                            </td>
                            <td>
                                * This is a computer generated invoice and does not require a physical signature
                            </td>
                        </tr>
                        <tr>
                            <td width="50%"></td>
                            <td>
                                <b>Authorized Signature</b><br><br>
                                ...................................<br><br><br>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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
            mailOptions.attachments = [{
                filename: 'invoice.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf',
            }];
    
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent with OTP and invoice successfully:', info.response);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending email');
        }
    }
    
    

  
}
module.exports = ParentPlanServices;