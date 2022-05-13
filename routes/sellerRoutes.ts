import express,{ Router } from 'express';
import controller from '../controllers/sellerController';

const router = express.Router();

router.post('/',controller.AddSeller);

export = router;