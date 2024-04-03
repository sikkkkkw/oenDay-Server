import Notice from "../models/notice";

export const noticeList = async (req, res) => {
  const OFFSET = 0;
  const LIMIT = 15;
  try {
    const data = await Notice.find({})
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(OFFSET);
    return res.send({ name: "list", data });
  } catch (error) {
    console.log(error);
  }
};

export const noticeWrite = async (req, res) => {
  try {
    const { title, description, writer } = req.body;
    const data = await Notice.create({
      title,
      description,
      writer,
      createdAt: new Date(Date.now()),
      // createdAt: new Date(Date.now() + 1000 * 60 * 60 * 9),
    });
    return res.send({ result: true, data });
  } catch (err) {
    console.log(err);
    return res.send({ result: false });
  }
};

export const noticeDetail = async (req, res) => {
  // req.params.id
  const {
    params: { id },
  } = req;
  try {
    const data = await Notice.findById(id);
    return res.send({ name: "detail", data: data });
  } catch (error) {
    console.log(error);
  }
};
export const noticeEdit = async (req, res) => {
  // const { title, description, writer } = req.body;
  // const { id } = req.params;

  const {
    body: { title, description, writer },
    params: { id },
  } = req;

  try {
    const data = await Notice.findByIdAndUpdate(
      id,
      {
        title,
        description,
        writer,
        updatedAt: new Date(Date.now()),
      },
      { new: true }
    );
    res.send({ result: true, data: data });
  } catch (error) {
    console.log(error);
  }
};
export const noticeDelete = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await Notice.findByIdAndDelete(id);
    res.send({ result: true });
  } catch (error) {
    console.log(error);
    res.send({ result: false, error });
  }
};
