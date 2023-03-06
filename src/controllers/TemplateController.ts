import asyncHandler from "express-async-handler";
import Template, { TemplateDocument } from "../models/Template";
import { Request, Response } from "express";

/**
 * Template Controller for managing templates in the database
 */
class TemplateController {

  /**
   * Create a new template in the database and return the created template
   * @param req Request object
   * @param res Response object
   * @returns Created template
   * @throws Error if template data is invalid
   * @static
   */
  static createTemplate = asyncHandler(async (req: Request, res: Response) => {
    const {
      templateName,
      productName,
      revision,
      quantity,
      lotNumber,
      partInventory,
      stationRecords,
    } = req.body;

    const template = await Template.create({
      templateName,
      productName,
      revision,
      quantity,
      lotNumber,
      partInventory,
      stationRecords,
    });

    if (template) {
      res.status(201).json({
        _id: template._id,
        templateName: template.templateName,
        productName: template.productName,
        revision: template.revision,
        quantity: template.quantity,
        lotNumber: template.lotNumber,
        partInventory: template.partInventory,
        stationRecords: template.stationRecords,
      });
    } else {
      res.status(400);
      throw new Error("Invalid template data");
    }
  });

  /**
   * Get all templates in the database and return them
   * @param req Request object
   * @param res Response object
   * @returns Array of templates
   * @static
   */
  static getTemplates = asyncHandler(async (req: Request, res: Response) => {
    const templates = await Template.find({});
    res.json(templates);
  });

  /**
   * Get a template by id and return it if it exists
   * @param req Request object
   * @param res Response object
   * @returns Template
   * @throws Error if template is not found
   * @static
   */
  static getTemplateById = asyncHandler(async (req: Request, res: Response) => {
    const template = await Template.findById(req.params.id);
    if (template) {
      res.json(template);
    } else {
      res.status(404);
      throw new Error("Template not found");
    }
  });

  /**
   * Update a template by id and return the updated template
   * @param req Request object
   * @param res Response object
   * @returns Updated template
   * @throws Error if template is not found
   * @static
   */
  static updateTemplate = asyncHandler(async (req: Request, res: Response) => {
    const {
      templateName,
      productName,
      revision,
      quantity,
      lotNumber,
      partInventory,
      stationRecords,
    } = req.body;

    const template = await Template.findById(req.params.id);

    if (template) {
      template.templateName = templateName;
      template.productName = productName;
      template.revision = revision;
      template.quantity = quantity;
      template.lotNumber = lotNumber;
      template.partInventory = partInventory;
      template.stationRecords = stationRecords;

      const updatedTemplate = await template.save();

      res.json({
        _id: updatedTemplate._id,
        templateName: updatedTemplate.templateName,
        productName: updatedTemplate.productName,
        revision: updatedTemplate.revision,
        quantity: updatedTemplate.quantity,
        lotNumber: updatedTemplate.lotNumber,
        partInventory: updatedTemplate.partInventory,
        stationRecords: updatedTemplate.stationRecords,
      });
    } else {
      res.status(404);
      throw new Error("Template not found");
    }
  });

  /**
   * Delete a template by id if it exists
   * @param req Request object
   * @param res Response object
   * @returns Success message
   * @throws Error if template is not found
   * @static
   */
  static deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
    const template: TemplateDocument = await Template.findById(req.params.id);
    if (template) {
      await template.remove();
      res.json({ message: "Template removed" });
    } else {
      res.status(404);
      throw new Error("Template not found");
    }
  });
}

export default TemplateController;