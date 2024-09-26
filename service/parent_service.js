const NotifyModel = require("../model/notification_model");
const ParentModel = require("../model/parent_model");
const ViewParentModel = require("../model/viewedParent_model");
const IdcodeServices = require("./idcode_service");
const bcrypt = require("bcrypt");

class ParentService {
  static async registerUser(
    fname,
    laname,
    gender,
    email,
    phone,
    unitnumber,
    address,
    location,
    city,
    state,
    postcode,
    password,
    kidname,
    grade,
    subject,
    tution_slot,
    credits
  ) {
    try {
      var parent_id = await IdcodeServices.generateCode("parents");
      const hashedpassword = await bcrypt.hash(password, 10);
      const createUser = new ParentModel({
        parent_id,
        fname,
        laname,
        gender,
        email,
        phone,
        unitnumber,
        address,
        location,
        city,
        state,
        postcode,
        password: hashedpassword,
        kidname,
        grade,
        subject,
        tution_slot,
        credits,
      });
      return await createUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async checkuser(email) {
    try {
      return await ParentModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async checkphone(phone) {
    try {
      return await ParentModel.findOne({ phone });
    } catch (error) {
      throw error;
    }
  }

  static async loginParent(email) {
    try {
      return await ParentModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async updateParent(
    parent_id,
    fname,
    laname,
    gender,
    email,
    phone,
    unitnumber,
    address,
    location,
    city,
    state,
    postcode,
    kidname,
    grade,
    subject,
    tution_slot,
   
  ) {
    try {
      var query = { parent_id: parent_id };
      var values = {
        $set: {
          fname: fname,
          laname: laname,
          gender: gender,
          email: email,
          phone: phone,
          unitnumber: unitnumber,
          address: address,
          location: location,
          city: city,
          state: state,
          postcode: postcode,
          kidname: kidname,
          grade: grade,
          subject: subject,
          tution_slot: tution_slot,
        },
      };
      return await ParentModel.updateOne(query, values);
    } catch (error) {
      throw error;
    }
  }

  static async deleteParent(parent_id) {
    try {
      var query = { parent_id: parent_id };
      return await ParentModel.findOneAndDelete(query);
    } catch (error) {
      throw error;
    }
  }

  static async getParent(parent_id) {
    try {
      var query = { parent_id: parent_id };
      return await ParentModel.find(query);
    } catch (error) {
      throw error;
    }
  }

  static async getSubject(subject) {
    try {
      var query = { subject: subject };
      return await ParentModel.find(query);
    } catch (error) {
      throw error;
    }
  }

  static async Parent() {
    try {
      return await ParentModel.find();
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(email, password) {
    try {
      var query = { email: email };
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(password, salt);
      var values = { $set: { password: hashpass } };
      return await ParentModel.updateOne(query, values);
    } catch (error) {
      print(error);
    }
  }

  static async resetPassword(phone, password) {
    try {
      var query = { phone: phone };
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(password, salt);
      var values = { $set: { password: hashpass } };
      return await ParentModel.updateOne(query, values);
    } catch (error) {
      throw error;
    }
  }

  static async reduceCredit(parent_id, tutor_id) {
    try {
      const parent = await ParentModel.findOne({ parent_id });

      if (!parent) {
        return { message: "Parent not found" };
      }

      const viewParent = await ViewParentModel.findOne({ parent_id });
      if (viewParent && viewParent.viewed.includes(tutor_id)) {
        return { message: "Tutor already followed" };
      }

      if (parent.credits > 0) {
        parent.credits--;
        await parent.save();

        if (viewParent) {
          viewParent.viewed.push(tutor_id);
          await viewParent.save();
        }

        if (viewParent.viewed.includes(tutor_id)) {
          const newNotification = new NotifyModel({
            tutor_id: tutor_id,
            view_id: parent_id,
            fname: parent.fname,
            lname: parent.laname,
          });
          await newNotification.save();
        }

        return { count: parent.credits };
      } else {
        return { message: "Count is already zero" };
      }
    } catch (error) {
      console.error("Error decreasing credits:", error);
      throw new Error("Error decreasing credits");
    }
  }

  static async creditsUpdate(parent_id, credits) {
    try {
      var query = { parent_id: parent_id };
      var values = {
        $set: {
          credits: credits,
        },
      };
      return await ParentModel.updateOne(query, values);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParentService;
