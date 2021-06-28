const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.json());
const db = require("./models");
const { Reimbursement } = require("./models");
const yup = require("yup");

async function CreateConveyanceReimbursement(args) {
  // validation goes here
  const schema = yup.object().shape({
    date: yup.date().required(),
    fromPlace: yup.string().required(),
    toPlace: yup.string().required(),
    purpose: yup.string().required(),
    conveyanceMode: yup.string().required(),
    travelKm: yup.number().integer(),
    invoNo: yup.number().integer(),
    amt: yup.number().integer().required(),
    attachment: yup.string(),
  });

  const validationError = await schema.validate(args, { abortEarly: false })
    .then(() => {
      return null
    })
    .catch(err => {
      return err
    })
  if (validationError) {
    return { reimbursement: null, err: validationError }
  }

  const res = await Reimbursement.create({
    reimbursementType: args.reimbursementType,
    date: args.date,
    fromPlace: args.fromPlace,
    toPlace: args.toPlace,
    purpose: args.purpose,
    conveyanceMode: args.conveyanceMode,
    travelKm: args.travelKm ? args.travelKm : null,
    invoNo: args.invoNo ? args.invoNo : null,
    amt: args.amt,
    attachment: args.attachment ? args.attachment : null
  })
    .then(reimbursement => {
      return { reimbursement, err: null }
    })
    .catch(err => {
      return { reimbursement: null, err }
    })

  return res
}

async function CreateHotelReimbursement(args) {
  // validation goes here
  const schema = yup.object().shape({
    fromDate:  yup.date().required(),
    toDate:  yup.date().required(),
    hotelName: yup.string().required(),

    invoNo: yup.number().integer(),
    amt: yup.number().integer().required(),
    attachment: yup.string().required(),
  });

  const validationError = await schema.validate(args, { abortEarly: false })
    .then(() => {
      return null
    })
    .catch(err => {
      return err
    })
  if (validationError) {
    return { reimbursement: null, err: validationError }
  }

  const res = await Reimbursement.create({
    reimbursementType: args.reimbursementType,
    fromDate: args.fromDate,
    toDate: args.toDate,
    hotelName: args.hotelName,

    invoNo: args.invoNo ? args.invoNo : null,
    amt: args.amt,
    attachment: args.attachment ? args.attachment : null
  })
    .then(reimbursement => {
      return { reimbursement, err: null }
    })
    .catch(err => {
      return { reimbursement: null, err }
    })

  return res
}

app.get('/reimbursements', async (req, res) => {
  Reimbursement.findAll()
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err => {
      console.log('error 1 : ', err);
      throw err
    })
});
app.get('/reimbursements/:id', async (req, res) => {
  Reimbursement.findByPk(req.params.id)
    .then(user => {
      res.status(200).json({ user })
    })
    .catch(err => {
      console.log('error 1 : ', err);
      throw err
    })
});
app.post('/reimbursements', async (req, res) => {
  const { reimbursementType } = req.body;

  if (!reimbursementType) {
    return res.status(400).json({
      error: {
        message: "reimbursementType is required!",
        type: "VALIDATION_FAILED"
      }
    })
  }
  if (reimbursementType === "conveyance") {
    const result = await CreateConveyanceReimbursement(req.body);
    if (result.err) {
      return res.status(400).json({ error: result.err })
    }
    return res.status(201).json(result.reimbursement)
  }
  if (reimbursementType === "hotel") {
    const result = await CreateHotelReimbursement(req.body);
    console.log('return data', result)
    if (result.err) {
      return res.status(400).json({ error: result.err })
    }
    return res.status(201).json(result.reimbursement)
  }
  res.status(400).json({ error: "reimbursementType must be either conveyance or hotel for now!" })
});

db.sequelize.sync().then((req) => {
  app.listen(3001, () => console.log('database connected and server running on 3001'))
}).catch(err => {
  console.log('err : ', err)
})