import express, { Request, Response } from "express";
import financialRecordModal from "../schema/financiall-record";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await financialRecordModal.find({
      userId: req.params.userId,
    });

    if (records.length === 0) {
      return res.status(404).send("No Records found for the user");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).json({
      message: "something is wrong",
      error: err,
    });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new financialRecordModal(newRecordBody);

    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).json({
      message: "something is wrong",
      error: err,
    });
  }
});
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;

    const record = await financialRecordModal.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) return res.status(404).send("not found ");

    res.status(200).send(record);
  } catch (err) {
    res.status(500).json({
      message: "something is wrong",
      error: err,
    });
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const record = await financialRecordModal.findByIdAndDelete(id);
    if (!record) return res.status(404).send("Not Found ");

    res.status(200).send("Deleted Successfully!");
  } catch (err) {
    res.status(500).json({
      message: "something is wrong",
      error: err,
    });
  }
});

export default router;
