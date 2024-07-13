const { handleGet, handlerError } = require("../helper/HandlerError");
const connectionPRTG = require("../utils/connection");
const Models = require("../models/index.js");
const { Json } = require("sequelize/lib/utils");

class ResponseController {
  static async tableJson(req, res) {
    const data = await connectionPRTG.tableJson(req.query);
    const { treesize, devices } = data;
    if(req.params.type == "listdevice")
    await Models.ListDevice.create({
      prtg_version: data["prtg-version"],
      treesize,
      devices: JSON.stringify(devices),
    });
    
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async tableXML(req, res) {
    const data = await connectionPRTG.tableXML(req.query);
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async detailSensor(req, res) {
    const data = await connectionPRTG.detailSensor(req.query);
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async monitoring(req, res) {
    const dataTableJson = await connectionPRTG.tableJson(req.query);
    const data = await connectionPRTG.detailSensor(req.query);
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
}
module.exports = ResponseController;
